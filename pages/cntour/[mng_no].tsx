// 프론트엔드!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { parseString } from "xml2js";
import { INSPECT_MAX_BYTES } from "buffer";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [mng_no, setMng_no] = useState("");
  console.log(router.query);

  useEffect(() => {
    setMng_no(router.query.mng_no?.toString() || "");
  }, [router.query]);

  return (
    <Layout title={"충남관광명소"}>
      <h1 className="w-full h-full flex flex-col justify-center items-center">
        {mng_no} - 상세보기 페이지
      </h1>
    </Layout>
  );
};

export default Home;
