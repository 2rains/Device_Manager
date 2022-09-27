import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";
import { User } from "@prisma/client";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [rename, setRename] = useState("");

  function 사용자추가함수() {
    console.log("사용자 추가함수가 클릭되었습니다.");
    fetch("/api/adduser") //호출할 주소
      .then((res) => res.json())
      .then((json) => {
        setUsers([...users, json.user]);
        users.push(json.user);
      }); // 그냥 다 외우기!
    // router.reload(); // 사용자 추가하면 자동으로 라우터(페이지) 새로고침해줌!!!
  }

  useEffect(() => {
    // 컴포넌트가 로딩될 때 한 번만 실행됨
    // 사용자 목록 가져와서 state 변수에 저장함
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  function 사용자삭제(targetId: string) {
    console.log(`삭제할 id ${targetId}`);
    fetch(`/api/user/delete/${targetId}`)
      .then((res) => res.json())
      .then((json) => {
        const filterUsers = users.filter((user) => user.id !== json.deletedId);
        setUsers(filterUsers);
        console.log(json.deletedId);
      });
  }

  function 이름변경(targetId: string) {
    if (!rename) return;

    const data = { name: rename };

    fetch(`/api/user/update/${targetId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(`${targetId}의 이름을 ${rename}으로 변경`);
  }

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
              <span>({user.age})</span>
            </div>
            <div>{user.addr}</div>
            <div>{user.favfood}</div>
            <div>{user.createAt.toString()}</div>
            <div>{user.id}</div>

            <div>
              <input
                type={"text"}
                className="border"
                value={rename}
                onChange={(e) => setRename(e.currentTarget.value)}
              />
              <button
                onClick={() => 이름변경(user.id)}
                className="bg-gray-200 text-blue-400 px-1 rounded hover:bg-gray-300"
              >
                수정
              </button>
            </div>

            <button
              className="bg-gray-400 text-white px- rounded hover:bg-gray-700"
              onClick={() => 사용자삭제(user.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
