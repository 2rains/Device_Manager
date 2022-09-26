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
