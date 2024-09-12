import { prisma } from "../../../config/prisma/prismaClient";

async function getNutritionByDate(date: Date, userId: number) {
  const today = date;
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayQuery = setDateToOffsetLocalTime(new Date(getDate(today)));
  const tomorrowQuery = setDateToOffsetLocalTime(new Date(getDate(tomorrow)));

  const nutritions = await prisma.profileNutrition.findMany({
    where: {
      date: {
        gte: todayQuery,
        lt: tomorrowQuery,
      },
      profile: {
        userId: userId,
      },
    },
    include: {
      nutrition: true,
    },
    orderBy: {
      date: 'asc'
    }
  });
  return nutritions;
}

function getDate(givenDate: Date): string {
  const offset = givenDate.getTimezoneOffset();
  givenDate = new Date(givenDate.getTime() - offset * 60 * 1000);
  var value = givenDate.toISOString().split("T")[0];
  return value;
}

function setDateToOffsetLocalTime(givenDate: Date): Date {
  const offset = givenDate.getTimezoneOffset();
  var dateInLocal = new Date(givenDate.getTime() + offset * 60 * 1000);
  return dateInLocal;
}

export { getNutritionByDate };
