import { Device } from "@prisma/client";
import { ftruncate } from "fs";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelctedId] = useState("");

  useEffect(() => {
    console.log("ddsfa");
    fetch(`/api/device/all`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setDevices(json.alldevice);
        }
      });
  }, []);

  function 셀렉트박스변경이벤트(event: React.ChangeEvent<HTMLSelectElement>) {
    // console.log(`선택된 value : ${event.currentTarget.value}`);
    setSelctedId(event.currentTarget.value);
  }

  return (
    <Layout title={"DATA"}>
      <div className="h-full overflow-y-scroll p-6 space-y-7">
        <h2 className="text-xl font-bold">장비 선택</h2>
        <div>
          <select
            onChange={셀렉트박스변경이벤트}
            className="w-full h-12 ring-2 ring-black text-gray-800 px-3"
          >
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                [{device.type}] {device.product} ({device.location}) ---
              </option>
            ))}
          </select>
        </div>
        {/* {devices.map((device) => (
            <div>{device.id}</div>
          ))} */}

        {selectedId ? (
          <div className="space-y-5">
            <h2 className="text-xl font-bold">선택장비 : {selectedId} </h2>
            <input
              placeholder="측정값을 입력하세요"
              className="w-full h-12 ring-2 ring-black text-gray-800 px-3"
            ></input>
            <button className="sm_btn w-full py-5 text-xl font-bold rounded">
              등 록
            </button>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Home;
