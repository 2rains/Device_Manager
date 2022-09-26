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
