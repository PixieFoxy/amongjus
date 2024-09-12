import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma/prismaClient";

async function nutritionIntakeUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user?.id === undefined) {
      console.log("User undefined in nutrition-intake-update");
      return res.sendStatus(401);
    }

    const nutritionIdParsed = parseInt(req.body.nutritionId);
    const nutrition = req.body.nutrition;
    const date = req.body.entryDate;
    const profileNutrition = await prisma.profileNutrition.update({
      where: {
        nutritionId: nutritionIdParsed,
      },
      data: {
        date: new Date(date),
        nutrition: {
          update: {
            where: {
              id: nutritionIdParsed,
            },
            data: {
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
      },
    });
    res.json(profileNutrition);
  } catch (error) {
    res.status(500).send("Something unexpected has occured. Please try again.");
    console.log(error);
  }
}

export { nutritionIntakeUpdate };
