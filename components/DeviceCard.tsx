import { Device } from "@prisma/client";
import { useEffect, useState } from "react";

interface DeviceCardProps {
  device: Device;
  realTime: Boolean;
}

function DeviceCard({ device, realTime }: DeviceCardProps) {
  const [value, setValue] = useState(-1);
  const [timerID, setTimerID] = useState<NodeJS.Timer>();

  function 센싱데이터업데이트() {
    console.log(`컴포넌트 로딩됨 - ${device.id}`);
    fetch(`/api/sensing/${device.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setValue(json.value);
        }
      });
  }

  useEffect(() => {
    // 실시간 버튼 바뀔 때마다 출력해줌(realtime=실시간버튼)
    console.log(`${device.id} - ${realTime}`);

    if (realTime) {
      //타이머 실행해서 데이터 패칭
      const tempTimerID = setInterval(() => {
        센싱데이터업데이트();
        console.log(`[실시간ON]${device.id} - ${realTime}`);
      }, 10000);
      setTimerID(tempTimerID);
    } else {
      //타이머 off
      clearInterval(timerID);
    }
  }, [realTime]);

  useEffect(() => {
    센싱데이터업데이트();
  }, []);

  return (
    <div
      data-comment="장비카드"
      className="m-5 bg-[#94bcd6] dark:bg-[#6c899c] rounded-3xl w-60 h-52 p-4 flex flex-col justify-between"
    >
      <div className="flex justify-end">
        <span className="text-5xl">{value ? value : "-"}</span>
        <span className="text-2xl">{device.unit}</span>
      </div>

      <div className="flex flex-col">
        <span className="text-[#ececec] font-medium">
          {device.location} {device.memo ? ` - ${device.memo}` : null}
        </span>
        <span className="text-xl font-semibold">{device.product}</span>
      </div>
    </div>
  );
}

export default DeviceCard;
