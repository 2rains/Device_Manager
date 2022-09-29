// 서버 함수임!!!
// 미리 데이터 받을 형식 갖춘 다음에 서버 만들어야 함

import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import client from "../../../libs/server/client";

interface Data {
  ok: boolean;
  error?: String;
  value?: number;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다 : ${request.method}`,
    });
    return;
  }

  try {
    const { deviceid } = request.query;

    // console.log("센싱값 가져올 장치 ID : " + deviceid);

    const sensing = await client.sencing.findFirst({
      where: {
        deviceId: deviceid?.toString(),
      },
      orderBy: {
        createAt: "desc",
      },
    });

    response.status(200).json({ ok: true, value: sensing?.value });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던 없던 실행되는 블록임!
    await client.$disconnect();
  }
}
