// 서버!!!!!!!!!!!!

import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

type Data = {
  name: string;
  totalCnt?: number;
  result?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req.query);
  let { start, end } = req.query; // 스타트 엔드 꺼내주기!

  if (!start) {
    // 스타트가 없다면 강제로 지정해줌
    start = "1";
    end = "5";
  } else {
    if (!end) {
      end = (Number(start) + 4).toString();
    }
  }
  if (Number(start) + 4 < Number(end)) {
    // end값이 너무 크더라도 end를 고정 시켜줌(최대5)
    end = (Number(start) + 4).toString();
  }

  if (Number(start) + 4 <= Number(end)) {
    end = (Number(start) + 4).toString();
  }
  console.log(`start:${start}  end:${end}`);
  // 실패한 코드!!!!!!!!!!!!!!

  try {
    fetch(
      `http://tour.chungnam.go.kr/_prog/openapi/?func=tour&start=${start}&end=${end}`
    )
      .then((res) => res.text())
      .then((xmlStr) => {
        parseString(xmlStr, { explicitArray: false }, function (err, obj) {
          // console.log(obj);
          // const totalCnt = obj.item_info.item.totalCnt;

          res.status(200).json({ name: "성공22222", result: obj });
        });
      });
  } catch (err) {
    res.status(500).json({ name: "실패" });
  }
}
