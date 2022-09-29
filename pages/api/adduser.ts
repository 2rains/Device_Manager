import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";

interface Data {
  ok: boolean;
  user?: User;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await client.user.create({
      data: { name: "홍길순", age: 20, addr: "서울시" },
    });
    res.status(200).json({ ok: true, user });
  } catch (err) {
    res.status(200).json({ ok: false });
  } finally {
    //예외가 있던 없던 실행되는 블록임!
    await client.$disconnect();
  }
}
