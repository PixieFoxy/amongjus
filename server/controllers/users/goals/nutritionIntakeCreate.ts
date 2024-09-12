import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma/prismaClient";

async function nutritionIntakeCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user?.id === undefined) {
      console.log("User undefined in nutrition-intake-create");
      return res.sendStatus(401);
    }
    const nutrition = req.body.nutrition;
    const date = req.body.entryDate;
    const profileNutrition = await prisma.profileNutrition.create({
      data: {
        date: new Date(date),
        profile: {
          connect: {
            userId: req.user.id,
          },
        },
        nutrition: {
          create: {
            energy: nutrition.energy,
            fat: nutrition.fat,
            carbs: nutrition.carbs,
            protein: nutrition.protein,
            fibre: nutrition.fibre,
            sugar: nutrition.sugar,
            sodium: nutrition.sodium,
          },
        },
      },
      include: {
        profile: true,
        nutrition: true,
      },
    });
    res.json(profileNutrition);
  } catch (error) {
    res.status(500).send("Something unexpected has occured. Please try again.");
    console.log(error);
  }
}

export { nutritionIntakeCreate };
