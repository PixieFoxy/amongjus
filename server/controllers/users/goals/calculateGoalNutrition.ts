import { Gender, Prisma } from "@prisma/client";

/**
 * @description Calculates the target nutrition using a formula based on several factors such as the goal itself, the age, the weight, and the height of the user.
 * @param target A number that defines the type of the target that a goal wishes to achieve.
 * - 1: Lose weight
 * - 2: Detox
 * - 3: Skin health
 * @param age The age of the user in years.
 * @param weight The weight of the user in kilograms.
 * @param height The height of the user in centimetres.
 * @param gender The gender of the user.
 * @returns YEET
 */
function calculateGoalNutrition(
  target: number,
  age: number,
  weight: number,
  height: number,
  gender: Gender
): Prisma.NutritionCreateInput {
  let nutrition: Prisma.NutritionCreateInput = {
    energy: "",
    fat: "",
    carbs: "",
    protein: "",
    fibre: "",
    sugar: "",
    sodium: "",
  };
  switch (target) {
    case 1:
      nutrition.energy = 2000 - weight * 3.69;
      nutrition.fat = Math.max(1, age) * 2.35;
      nutrition.carbs = (height - weight) * Math.max(1, 100 - age);
      nutrition.protein = Math.max(1, weight) * 3.5;
      nutrition.fibre = 60;
      nutrition.sugar = 6.9;
      nutrition.sodium = 420;
      break;
    case 2:
      nutrition.energy = 2500 - weight * 5.25;
      nutrition.fat = Math.max(6, 120 - age);
      nutrition.carbs = (height - weight) * Math.max(1, 100 - age);
      nutrition.protein = Math.max(1, weight) * 3;
      nutrition.fibre = 500;
      nutrition.sugar = gender === "female" ? 5.3 : 7.7;
      nutrition.sodium = 963;
      break;
    case 3:
      nutrition.energy = age > 30 ? 1690 : 2222;
      nutrition.fat = 0.07 * Math.max(1, age) * Math.max(20, height - 100);
      nutrition.carbs = 0.01 * (height - weight) * Math.max(1, 100 - age);
      nutrition.protein = Math.max(1, weight) * 2.3 + 1;
      nutrition.fibre = gender === "male" ? 50 : 33.3;
      nutrition.sugar = age < 55 && gender === "female" ? 4.2 : 18;
      nutrition.sodium = 666;
      break;
    default:
      nutrition.energy = 69;
      nutrition.fat = 69;
      nutrition.carbs = 69;
      nutrition.protein = 69;
      nutrition.fibre = 69;
      nutrition.sugar = 69;
      nutrition.sodium = 69;
      break;
  }
  return nutrition;
}

export { calculateGoalNutrition };
