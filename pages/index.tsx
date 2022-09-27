import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title={"HOME"}>
      <div className="h-full overflow-y-scroll p-6 font-serif space-y-10">
        {/* <div className="h-[100vh]">안녕</div> */}
        <div id="웰컴메세지" className="flex justify-between items-center">
          <div>
            <div className="text-4xl font-bold">Hello Rain!</div>
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
          <div>실시간 버튼 자리</div>
        </div>
        <div id="센서목룍" className="flex flex-wrap">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((device, idx) => {
            return (
              <div
                key={idx}
                data-comment="장비카드"
                className="m-5 bg-[#94bcd6] dark:bg-[#6c899c] rounded-3xl w-60 h-52 p-4 flex flex-col justify-between"
              >
                <div className="flex justify-end">
                  <span className="text-5xl">25</span>
                  <span className="text-2xl">%</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[#ececec] font-medium">
                    안방 - 메모
                  </span>
                  <span className="text-xl font-semibold">
                    샤오미 공기청정기
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
