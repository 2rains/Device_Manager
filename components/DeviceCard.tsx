import { Device } from "@prisma/client";
import { useEffect, useState } from "react";

interface DeviceCardProps {
  device: Device;
}

function DeviceCard({ device }: DeviceCardProps) {
  const [value, setValue] = useState(-1);

  useEffect(() => {
    console.log(`컴포넌트 로딩됨 - ${device.id}`);
    fetch(`/api/sensing/${device.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setValue(json.value);
        }
      });
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
