// 서버 함수임!!!
// 미리 데이터 받을 형식 갖춘 다음에 서버 만들어야 함
// 신규 디바이스 추가 파일

import { Device } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

interface Data {
  ok: boolean;
  error?: String;
  newDevice?: Device; // 응답메세지
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  // 405 allow method check // 무조건 post만 받을 거임!
  if (request.method !== "POST") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다 : ${request.method}`,
    });
    return;
  }

  //   const {
  //     body: { product, location, type, unit, memo },
  //   } = request;
  const { product, location, type, unit, memo } = JSON.parse(request.body); // 편지 내용  setting.tsx의 fetch에서 보내줌
  // request.body가 요청 메세지임
  // 이렇게 쓰면 괄호 풀어서 문자열로 한 번에 들어감!!!!!!!

  // 입력 필드 검증!
  if (true) {
    if (!product) {
      return response
        .status(200)
        .json({ ok: false, error: "제품명(product)이 없습니다" });
    }
    if (!location) {
      return response
        .status(200)
        .json({ ok: false, error: "위치(location)가 없습니다" });
    }
    if (!type) {
      return response
        .status(200)
        .json({ ok: false, error: "장치종류(type)가 없습니다" });
    }
    if (!unit) {
      return response
        .status(200)
        .json({ ok: false, error: "측정단위(unit)가 없습니다" });
    }
  }
  try {
    // Device row DB Create
    const newDevice = await client.device.create({
      // 위의 const{product,---}에서 보내준 게 여기로 들어옴
      data: {
        product,
        location,
        type,
        unit,
        memo,
      },
    });

    response.status(200).json({ ok: true, newDevice }); // 응답메세지(처리결과)
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던 없던 실행되는 블록임!
    await client.$disconnect();
  }
}
