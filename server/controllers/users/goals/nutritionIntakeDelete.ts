import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/prisma/prismaClient";

async function nutritionIntakeDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user?.id === undefined) {
      console.log("User undefined in nutrition-intake-delete");
      return res.sendStatus(401);
    }
    const nutritionIdParsed = parseInt(req.body.nutritionId);

    // Delete the row on ProfileNutrition table
    const profileNutritionDelete = prisma.profileNutrition.delete({
      where: {
        nutritionId: nutritionIdParsed,
      },
    });

    // Delete the row on Nutrition table
    const nutritionEntryDelete = prisma.nutrition.delete({
      where: {
        id: nutritionIdParsed,
      },
    });

    // Commit the transaction of both deletions simultaneously
    const transaction = await prisma.$transaction([
      profileNutritionDelete,
      nutritionEntryDelete,
    ]);
    res.json(transaction);
  } catch (error) {
    res.status(500).send("Something unexpected has occured. Deletion failed. Please try again.");
    console.log(error);
  }
}

export { nutritionIntakeDelete };
