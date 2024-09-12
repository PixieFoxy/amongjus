import { Request, Response } from "express";
import { prisma } from "../../../config/prisma/prismaClient";
import { Gender, Prisma } from "@prisma/client";
import { calculateGoalNutrition } from "./calculateGoalNutrition";
import assert from "assert";

async function goalEdit(req: Request, res: Response) {
  try {
    if (req.user?.id === undefined) {
      console.log("User undefined in goal-edit");
      return res.sendStatus(401);
    }

    // Find the profile to have its goal updated and get the necessary stats.
    const profile = await prisma.profile.findUnique({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
        age: true,
        weight: true,
        height: true,
        gender: true,
        goal: true,
      },
    });
    if (profile === null) {
      throw Error("Profile not found.");
    }

    // Calculate the nutrition needed for goal chosen by the user and create/update the Nutrition entry.
    const target: number = parseInt(req.body.target);
    const nutritionCalculation = calculateGoalNutrition(
      target,
      profile.age,
      profile.weight,
      profile.height,
      profile.gender !== null ? profile.gender : "other"
    );
    assert(nutritionCalculation, "Nutrition Calculation failed");

    const nutritionCreated = await prisma.nutrition.upsert({
      where: {
        id: profile.goal?.targetNutritionId,
      },
      create: {
        energy: nutritionCalculation.energy,
        fat: nutritionCalculation.fat,
        carbs: nutritionCalculation.carbs,
        protein: nutritionCalculation.protein,
        fibre: nutritionCalculation.fibre,
        sugar: nutritionCalculation.sugar,
        sodium: nutritionCalculation.sodium,
      },
      update: {
        energy: nutritionCalculation.energy,
        fat: nutritionCalculation.fat,
        carbs: nutritionCalculation.carbs,
        protein: nutritionCalculation.protein,
        fibre: nutritionCalculation.fibre,
        sugar: nutritionCalculation.sugar,
        sodium: nutritionCalculation.sodium,
      },
    });

    if (nutritionCreated === null) {
      throw Error("Nutrition creation failed");
    }

    // Create or update the goal in the user profile using newly-created target Nutrition.
    const description = generateDescription(target);
    const updateGoal = await prisma.goal.upsert({
      where: {
        profileId: profile.id,
      },
      create: {
        profileId: profile.id,
        target: target,
        desc: description,
        targetNutritionId: nutritionCreated.id,
      },
      update: {
        target: target,
        desc: description,
        targetNutritionId: nutritionCreated.id,
      },
      include: {
        targetNutrition: true,
      },
    });
    res.json(updateGoal);
  } catch (error) {
    res.status(500).send("Something unexpected has occured. Please try again.");
    console.log(error);
  }
}

function generateDescription(target: number): string {
  switch (target) {
    case 1:
      return "Lose Weight";
    case 2:
      return "Detoxify";
    case 3:
      return "Strengthen Skin";
    default:
      return "Clueless";
  }
}
export { goalEdit };
