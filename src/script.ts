import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.score.create({
    data: {
      playerName: "John Smith",
      score: 20,
    },
  });

  const allScores = await prisma.score.findMany();
  console.log(allScores);
}

main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
