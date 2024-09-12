import { Nutrition, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../../../config/prisma/prismaClient";

async function compareNutritionIntakeToTarget(
  intakes: Nutrition[],
  userId: number
) {
  try {
    let total: Nutrition = {
      id: 0,
      energy: new Decimal(0),
      fat: new Decimal(0),
      carbs: new Decimal(0),
      protein: new Decimal(0),
      fibre: new Decimal(0),
      sugar: new Decimal(0),
      sodium: new Decimal(0),
    };
    intakes.forEach((entry) => {
      total.energy = total.energy.plus(entry.energy);
      total.fat = total.fat.plus(entry.fat);
      total.carbs = total.carbs.plus(entry.carbs);
      total.protein = total.protein.plus(entry.protein);
      total.fibre = total.fibre.plus(entry.fibre);
      total.sugar = total.sugar.plus(entry.sugar);
      total.sodium = total.sodium.plus(entry.sodium);
    });
    const target = await prisma.goal.findFirst({
      where: {
        profile: {
          userId: userId,
        },
      },
      select: {
        targetNutrition: true,
      },
    });
    if (target === null) {
      throw new Error("Goal not found.");
    }
    let fulfilled = {
      energy: total.energy.greaterThanOrEqualTo(target.targetNutrition.energy),
      fat: total.fat.greaterThanOrEqualTo(target.targetNutrition.fat),
      carbs: total.carbs.greaterThanOrEqualTo(target.targetNutrition.carbs),
      protein: total.protein.greaterThanOrEqualTo(
        target.targetNutrition.protein
      ),
      fibre: total.fibre.greaterThanOrEqualTo(target.targetNutrition.fibre),
      sugar: total.sugar.greaterThanOrEqualTo(target.targetNutrition.sugar),
      sodium: total.sodium.greaterThanOrEqualTo(target.targetNutrition.sodium),
    };
    return fulfilled;
  } catch (error) {
    console.log(error);
    throw new Error("Something unexpected has occured. Please try again.");
  }
}

export { compareNutritionIntakeToTarget };
