import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import Layout from "../components/Layout";

import Toggle from "react-toggle";
import { BounceLoader } from "react-spinners";

const Home: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [bToggle, setBToggle] = useState(false);

  useEffect(() => {
    // 데이터 가져옴
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setDevices(json.alldevice);
          // console.log(json.alldevice);
        }
      });
  }, []);

  function 토글변경() {
    setBToggle(!bToggle);
    console.log(`토글변경됨 - ${!bToggle}`);

    if (!bToggle) {
      console.log("실시간on");
    } else {
      console.log("실시간off");
    }
  }

  return (
    <Layout title={"HOME"}>
      <div className="h-full overflow-y-scroll p-6 font-serif space-y-10">
        {/* <div className="h-[100vh]">안녕</div> */}

        <div id="웰컴메세지" className="flex justify-between items-center">
          <div>
            <div className="text-4xl font-bold">Hello LSB!</div>
            <div className="text-gray-500:">Welcome back to home</div>
          </div>
          <Link href={"/setting"}>
            <button
              className=" space-x-2 text-white bg-[#5e7696] dark:bg-[#8e9fb6] dark:text-gray-800
           hover:bg-[#9cbace]  dark:hover:bg-[#748b9b] py-3 px-4 pb-2 pl-5 rounded-3xl flex "
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
          </Link>
        </div>
        <div id="링크드유" className="flex justify-between items-center">
          <div className="text-2xl font-medium">Linked to you</div>
          <div className="select-none flex items-center space-x-2">
            {bToggle && <BounceLoader color="#36d7b7" size={30} />}
            <Toggle
              id={"cheese-status"}
              onChange={토글변경}
              defaultChecked={bToggle}
            ></Toggle>
            <label htmlFor="cheese-status">
              실시간 <span>{bToggle ? "ON" : "OFF"}</span>
            </label>
          </div>
        </div>
        <div id="센서목룍" className="flex flex-wrap">
          {devices.map((device, idx) => {
            return <DeviceCard key={idx} device={device} realTime={bToggle} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
