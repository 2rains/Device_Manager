import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";
import { User } from "@prisma/client";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  function 사용자추가함수() {
    console.log("사용자 추가함수가 클릭되었습니다.");
    fetch("/api/adduser");
  }

  useEffect(() => {
    // 컴포넌트가 로딩될 때 한 번만 실행됨
    // 사용자 목록 가져와서 state 변수에 저장함
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  return (
    <>
      <Counter title="내 첫 번째 카운터" />
      <button
        className="bg-purple-400 p-2 rounded-m-2"
        onClick={사용자추가함수}
      >
        사용자 추가
      </button>
      <div className="flex flex-wrap">
        {users.map((user) => (
          <div key={user.id} className="border-2">
            <div className="text-2xl font-bold">
              <span>{user.name}</span>
              <span>{user.age}</span>
            </div>
            <div>{user.addr}</div>
            <div>{user.favfood}</div>
            <div>{user.createAt.toString()}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
