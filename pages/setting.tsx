import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [location, setLocation] = useState(""); // 설치위치
  const [type, setType] = useState(""); // 장치종류
  const [unit, setUnit] = useState(""); // 단위
  const [product, setProduct] = useState(""); // 제품명
  const [memo, setMemo] = useState(""); //메모
  const [addDevice, setAddDevice] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //에러 메세지(입력 안 했을 경우)
  const [enterDevice, setEnterDevice] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  function ClearForm() {
    setLocation("");
    setUnit("");
    setProduct("");
    setMemo("");
    setErrorMessage("");
    setType("");

  }

  function 장비추가버튼클릭() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    ClearForm();
  }

  // <select> change
  function 장치종류변경(event: React.FormEvent<HTMLSelectElement>) {
    setType(event.currentTarget.value); // select에서 선택한 옵션의 value 값
  }

  function 장비등록() {
    if (!product) {
      setErrorMessage("제품명을 입력하세요!");
      return;
    }
    if (!location) {
      setErrorMessage("위치를 입력하세요!");
      return;
    }
    if (!unit) {
      setErrorMessage("단위를 입력하세요!");
      return;
    }
    if (!type) {
      setErrorMessage("장치종류를 선택하세요");
      return;
    } else setErrorMessage("");
    // 입력폼에 데이터 있는 지 확인
    const data = { location, type, unit, product, memo };
    //서버에 body로 싣어서 보낼 데이터  -> add.ts파일로 보내줌
    fetch("/api/device/add", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.ok) {
          // 등록성공
          document
            .querySelector("#container_add_device")
            ?.classList.toggle("hidden"); // 등록폼 숨기기
          ClearForm(); // 입력창 초기화

          const tempArr = [...devices, json.newDevice];
          setDevices(tempArr);
        } else {
          //등록실패
          setErrorMessage("등록에 실패했습니다.");
        }
      });
    // 전송완료시 입력창 초기화
    //오류 있으면 표시해줘야 됨
    //
  }

  function 장치삭제(deviceId: string) {
    // console.log(deviceId);
    if (!deviceId) return;

    // 삭제 API 호출
    fetch(`/api/device/${deviceId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          // 삭제완료
          console.log(json.deleteDevice.id);

          const tempArr = devices.filter(
            (device) => device.id !== json.deleteDevice.id
          );
          setDevices(tempArr);
        }
      });
  }

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setDevices(json.alldevice));
  }, []);

  return (
    <Layout title={"SETTING"}>
      <div className="p-6 h-full overflow-y-scroll font-serif space-y-10">
        <div data-comment={"장비추가버튼"} className="flex justify-end">
          <button
            onClick={장비추가버튼클릭}
            className=" space-x-2 text-white bg-[#5e7696] dark:bg-[#8e9fb6] dark:text-gray-800
           hover:bg-[#9cbace]  dark:hover:bg-[#748b9b] py-3 px-4 pl-5 rounded-3xl flex "
          >
            <span>Add Device</span>
            <span data-comment="플러스아이콘">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </button>
        </div>

        <div
          id={"container_add_device"}
          data-comment={"새로운 디바이스 추가"}
          className="space-y-5 hidden" // 보였다가 사라지게 하기
        >
          <hr />
          <div className="text-3xl font-bold">New Device</div>
          <div className="flex flex-col">
            <span>장치 종류 *</span>
            <select
              className="h-14 ring-2 ring-black text-gray-800 px-3"
              onChange={장치종류변경}
            >
              <option hidden>장치 종류를 선택하세요</option>
              <option value="TEMP">온도 센서</option>
              <option value="HUMI">습도 센서</option>
              <option value="CO2">CO2 센서</option>
            </select>
          </div>

          <div className="flex flex-col">
            <span>제품명 *</span>
            <input
              type={"text"}
              value={product}
              onChange={(event) => setProduct(event.currentTarget.value)}
              placeholder="제품명을 입력하세요"
              className="h-14 ring-2 ring-black text-gray-800 px-3"
            />
          </div>

          <div className="flex flex-col">
            <span>설치 위치 *</span>
            <input
              type={"text"}
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
              placeholder="거실, 안방, etc..."
              className="h-14 ring-2 ring-black text-gray-800 px-3"
            />
          </div>

          <div className="flex flex-col">
            <span>단위 *</span>
            <input
              type={"text"}
              value={unit}
              onChange={(event) => setUnit(event.currentTarget.value)}
              placeholder="측정단위 (eg : ℃, %)"
              className="h-14 ring-2 ring-black text-gray-800 px-3"
            />
          </div>

          <div className="flex flex-col">
            <span>메모</span>
            <input
              type={"text"}
              value={memo}
              onChange={(event) => setMemo(event.currentTarget.value)}
              placeholder="메모를 입력하세요"
              className="h-14 ring-2 ring-black text-gray-800 px-3"
            />
          </div>

          {errorMessage ? (
            <div className="text-red-500">{errorMessage}</div>
          ) : null}

          <button
            onClick={장비등록}
            className="sm_btn w-full py-5 text-xl font-bold rounded "
          >
            등록
          </button>

          <hr />
        </div>
        <div data-comment={"장비삭제메뉴"}>
        <h2 className="text-xl font-bold">장치목록</h2>

          <div>
            {devices && devices.map((device, idx) => (
              <div key={idx} className="border-b-4 py-5 flex justify-between">
                <div>
                  <div>{device.id}</div>
                  <div>
                  [{device.type}]{" "}
                    <span className="font-bold">{device.product}</span> (
                    {device.location})
                  </div>
                  <div>{device.memo}</div>
                </div>
                <button
                  onClick={() => 장치삭제(device.id)}
                  className="text-red-500 bg-red-200 w-16 h-16 rounded-xl"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
