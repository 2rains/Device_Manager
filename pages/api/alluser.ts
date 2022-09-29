import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { User } from "@prisma/client";

// type Data = {
//   name: string;
// };

interface ResponseDataType {
  // 응답할 데이터형 지정
  name: string;
  users: User[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) {
  try {
    const users = await client.user.findMany();
    console.log(users);
    res.status(200).json({ name: "okokok", users: users });
    //     res.status(200).json({ name: "okokok", users }); users:users를 users로 사용가능!!
  } catch (err) {
  } finally {
    //예외가 있던 없던 실행되는 블록임!
    await client.$disconnect();
  }
}
