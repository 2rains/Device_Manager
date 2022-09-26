import type { NextPage } from "next";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  return (
    <>
      <div>Hello World</div>
      <Counter title="내 첫 번째 카운터" practice2={[12, 3, 4, 8]} />
    </>
  );
};

export default Home;
