import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

type Data = {
  name: string;
  totalCnt?: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    fetch("http://tour.chungnam.go.kr/_prog/openapi/?func=tour&mode=getCnt")
      .then((res) => res.text())
      .then((xmlStr) => {
        parseString(xmlStr, { explicitArray: false }, function (err, obj) {
          console.log(obj.item_info.item.totalCnt);
          const totalCnt = obj.item_info.item.totalCnt;
          res.status(200).json({ name: "성공22222", totalCnt });
        });
      });
    // res.status(200).json({ name: "성공111111" });
  } catch (err) {
    res.status(500).json({ name: "실패" });
  }
}
