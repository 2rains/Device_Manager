// 프론트엔드!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { parseString } from "xml2js";
import { INSPECT_MAX_BYTES } from "buffer";
import Link from "next/link";

interface Item {
  mng_no: string;
  local_nm: string;
  type: string;
  nm: string;
  nm_sub: string;
  addr: string;
  lat: string;
  lng: string;
  tel: string;
  h_url: string;
  desc: string;
  list_img: string;
}

interface Item_info {
  item: Item[];
}

interface Result {
  item_info: Item_info;
}

interface CntourListRespons {
  name: string;
  result?: Result;
}

const Home: NextPage = () => {
  const [totalCnt, setTotalCnt] = useState(0);
  const [tours, setTours] = useState<Item[] | undefined>([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    console.log("------충남관광명소 총 아이템 개수 로딩중--------");
    fetch("/api/tour/cntour")
      .then((res) => res.json())
      .then((json) => setTotalCnt(json.totalCnt));
  }, []);

  function 관광명소가져오기() {
    console.log("------충남관광명소 리스트 로딩중--------");
    fetch(`/api/tour/cntourlist?start=${pageNo}&end=${pageNo + 2}`) //더보기 누르면 페이지 수 4씩 늘어남
      .then((res) => res.json())
      .then((json: CntourListRespons) => {
        const 기존배열 = tours || []; // undefined면 공배열[]이 들어감!`
        const 신규배열 = json.result?.item_info.item || [];
        setTours([...기존배열, ...신규배열]); // 새로 들어온 배열 설정하는 곳

        setPageNo(pageNo + 3);
      });
  }

  useEffect(() => {
    관광명소가져오기();
  }, []);

  return (
    <Layout title={"충남관광명소"}>
      <div className="h-full overflow-y-scroll p-6 font-serif space-y-10">
        <div>충남 관광명소 페이지</div>
        <div>{totalCnt}개의 관광명소가 있당</div>
        {tours?.map((tour) => (
          <Link key={tour.mng_no} href={`/cntour/${tour.mng_no}`}>
            <button>
              <div key={tour.mng_no}>
                <div>{tour.local_nm}</div>
                <div>{tour.addr}</div>
                <img src={tour.list_img}></img>
              </div>
            </button>
          </Link>
        ))}
        <button
          onClick={관광명소가져오기}
          className="w-full bg-red-200 h-10 rounded felx items-center justify-center"
        >
          더보기 ({tours?.length}/{totalCnt}) - {pageNo}
        </button>
      </div>
    </Layout>
  );
};

export default Home;
