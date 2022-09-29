//markDown 텍스트->HTML 변환

# crate-next-app

next.js typescript 프로젝트 생성

```
> npx crate-next-app <폴더명> --typescript
```

# tailwind CSS(Next.js) 적용

1. tailwind CSS 설치
   [tailwind 설치 링크](https://tailwindcss.com/docs/guides/nextjs)

```
1-1 터미널에 입력
> npm install -D tailwindcss postcss autoprefixer
>npx tailwindcss init -p
```

npm : 패키지를 설치하는 명령어
npx : 패키지를 실행하는 명령어

```
1-2 tailwind.config.js 파일에 작성
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```
1-3 globals.css 파일에 작성(로컬파일)
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```
1-4 터미널에서 실행
npm run dev
```

# prisma

database ORM이다

1. VSCODE `prisma` 확장 프로그램 설치

2. `prisma` 패키지 설치

```
> npm i prisma -D
> npx prisma init
```

3. prisma 초기 설정

```
warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.
> .gitignore 파일 안에 맨 밑에 `.env` 타이핑 하기(개인정보보호)

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no
tables yet, read https://pris.ly/d/getting-started
> DATABASE_URL-<내 데이터베이스 주소>

2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
> prisma/schema.prisma파일에 `mongodb` 추가
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"    <-----  이 부분에 추가
  url      = env("DATABASE_URL")
}

3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

*prettier 적용 안 될 땐 오른쪽 밑에 종모양 클릭 -> prisma 확장자 선택
```

4. 데이터베이스에 스키마 업로드(서버 반영)

```
> npx prisma db push
```

5. prisma studio 실행(데이터베이스 웹 클라이언트)

```
> npx prisma studio
이 명령어가 실행 중에만 접속 가능
```

6. `prisma` client 설정

```
> npx prisma generate
```

7. DB에 추가하기

```
> pages/api/adduser.ts(생성)
> adduser.ts
* 이렇게 하면 새로 생성됨!
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const User = await client.user.create({
      data: { name: "홍길순", age: 20, addr: "서울시" },
    });
    res.status(200).json({ name: "OK OKAY" });
  } catch (err) {
    res.status(200).json({ name: "NG NO GOOD" });
  }
}
```

8. `prisma CRUD`

```
Create Read Update Delete
[prisma CRUD 링크](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
Create Read Update Delete
```

9. `fetch`사용해서 웹 페이지에 출력

```
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  const [users, setUsers] = useState([]);

  function 사용자추가함수() {
    console.log("사용자 추가함수가 클릭되었습니다.");
  }

  useEffect(() => {
    // 컴포넌트가 로딩될 때 한 번만 실행됨
    // 사용자 목록 가져와서 state 변수에 저장함
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => console.log(json));
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
    </>
  );
};

export default Home;
```

10. 타입스크립트 우회하기

```
// @ts-ignore
오류자체만 우회함(바로 밑에 한 줄만 가능)
주석과 함께 사용(단, 급할 때만 사용! 남용x)
```

11. `React`에서 배열에 값을 추가하기

```
...[기존배열, 새로운 배열 값]

1. ...[] 이면 중괄호가 사라짐
2. 새로운 배열 값이 기존 배열 마지막에 들어감
3. 다시 중괄호 생기면서 배열에 값이 추가됨


function 사용자추가함수() {
    fetch("/api/adduser") //호출할 주소
      .then((res) => res.json())
      .then((json) => {
        setUsers([...users, json.user]);
        users.push(json.user);
      });
}
```

12. `DarkMode` 적용

```
01. function 다크모드전환() {
    document.body.classList.toggle("dark");
    // 어떤 요소에 classList.toggle을 하면 있으면 없애고 없으면 있게 만들어 줌!!
  }

02. 다크모드 아이콘
<div onClick={다크모드전환}/>

03.
<div className="dark:bg-[#1E1E20] dark:text-white"></div>
```

13. 그 외

```
# 자주 사용하는 CSS 함수 만들기 #
> global.css(파일)

.함수명 {
  @apply text-white bg-[#5e7696] dark:bg-[#8e9fb6] dark:text-gray-800
    hover:bg-[#9cbace]  dark:hover:bg-[#748b9b];
}

** @apply 꼭 사용하기(tailwind css를 사용하기 위해)


# `데이터베이스` 세팅 #
> /prisma/schema.prisma
model Device {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  createAt DateTime @default(now())
  updateAt DateTime @updatedAt

  product  String
  location String
  type     String // TEMP HUMI CO2
  unit     String
  memo     String?

  sencings Sencing[] // 모델 Sencing 자체를 데이터형으로 지정하면 자동으로 관계 맺어줌(prisma 기능)
}

model Sencing {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  createAt DateTime @default(now())
  updateAt DateTime @updatedAt

  value    Float
  Device   Device? @relation(fields: [deviceId], references: [id])  // 자동으로 관계 형성해줌
  deviceId String? @db.ObjectId // 위의 모델에서 Device id 들어옴!
}

# `데이터베이스` 세팅 후 #
1. 스키마 변경하면  npx prisma db push
2. 실행했는 지 확인(웹브라우저) npx prisma studio

# `DB` 끊어주기! #
try{
} catch{
}finally {
    //예외가 있던 없던 실행되는 블록임!
    await client.$disconnect();
  }

finally만 추가해주면 됌(전체에 추가해주기)
연결 해제 안 해주면 계정 잠김!(디도스 공격인 줄 앎)

# VerCel(DB파일 올리기) #

VerCel > setting > Environment > Variables > NAME-DATABASE_URL에 넣기 / VALUE-"주소" > 다시 버셀 내 프로젝트 들어가서 > Deployment에 reDeploy하기(재업로드)


# 정리 #
클라이언트(pc,태블릿(즉,사용자))는 서버(클라이언트랑 통신하는 애)를 통해 DB서버에 들어감
디비 입장에선 서버가 클라이언트임
클라이언트 요청 -> 서버는 DB에게 요청 -> DB는 서버에게 줌 -> 서버는 DB를 json형태로 클라이언트에게 줌
클라이언트(react) - 서버(next.js) - DB(몽고디비)
API(서버)는  클라이언트와 통신하는 파일임!!!!!


# 정리-2 #
http://api/device/fgds/[id]?name=이슬비&age=24
                          {--------URL파라미터}
req.query.id
req.query.name
req.query.age

url 자체에 데이터를 실어서 보내는 방식임!


```
