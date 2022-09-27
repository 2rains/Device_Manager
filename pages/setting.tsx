import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("");
  const [product, setProduct] = useState("");
  const [memo, setMemo] = useState("");

  function 장비추가버튼클릭() {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    setLocation("");
    setUnit("");
    setProduct("");
    setMemo("");
  }
  return (
    <Layout title={"SETTING"}>
      <div className="p-6 space-y-6">
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
          data-comment={"New Device"}
          className="space-y-5 "
        >
          <hr />
          <div className="text-3xl font-bold">New Device</div>

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

          <button className="sm_btn w-full py-5 text-xl font-bold rounded ">
            등록
          </button>

          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
