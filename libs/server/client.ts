import { PrismaClient } from "@prisma/client";

export default new PrismaClient();

// prisma.user.create({ data: { name: "홍길순2", age: 20, addr: "제주도" } });
// 데이터 한 줄 생성
