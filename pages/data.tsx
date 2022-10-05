import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [sensingValue, setSensingValue] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelctedId] = useState("");
  const router = useRouter();
  
  function 셀렉트박스변경이벤트(event: React.ChangeEvent<HTMLSelectElement>) {
    // console.log(`선택된 value : ${event.currentTarget.value}`);
    setSelctedId(event.currentTarget.value);
  }
    useEffect(() => {
    fetch(`/api/device/all`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setDevices(json.alldevice);
        }
      });
  }, []);

  function 센서값변경(event: React.ChangeEvent<HTMLInputElement>) {
    const inputStr: string = event.currentTarget.value;

    if (!Number.parseInt(inputStr)) return;

    setSensingValue(inputStr);

    console.log(selectedId, inputStr);
  }

  function 등록버튼클릭() {
    const data = { value: sensingValue };
    fetch(`/api/sencing/${selectedId}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          router.reload();
        }
      });
  }


  return (
    <Layout title={"DATA"}>
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <h2 className="text-xl font-bold">장비 선택</h2>
        <div>
        {0 < devices.length ? null : <div>등록된 장비가 없습니다</div>}

        {0 < devices.length && (
          <select
            onChange={셀렉트박스변경이벤트}
            className="w-full h-12 ring-2 ring-black text-gray-800 px-3"
          >
            <option hidden>장비를 선택 해주세요</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                [{device.type}] {device.product} ({device.location})
              </option>
            ))}
          </select>
)}
        </div>
        {/* {devices.map((device) => (
            <div>{device.id}</div>
          ))} */}

        {selectedId ? (
          <div className="space-y-5">
            <h2 className="text-xl font-bold">선택장비 : {selectedId} </h2>
            <input
              type={"number"}
              placeholder="측정값을 입력하세요"
              className="w-full h-12 ring-2 ring-black text-gray-800 px-3"
              value={sensingValue}
              onChange={센서값변경}
            ></input>
            <button onClick={등록버튼클릭} className="sm_btn w-full py-5 text-xl font-bold rounded">
              등  록
            </button>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Home;
