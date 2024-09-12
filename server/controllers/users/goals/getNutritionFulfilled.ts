import { Request, Response } from "express";
import { getNutritionByDate } from "./getNutritionByDate";
import { Nutrition } from "@prisma/client";
import { compareNutritionIntakeToTarget } from "./compareNutritionIntakeToTarget";

async function getNutritionFulfilled(req: Request, res: Response) {
  try {
    if (req.user.id === undefined) {
      console.log("User undefined in get-goal");
      return res.sendStatus(401);
    }

    // Get all nutrition entries of the user on a particular date.
    const nutritions = await getNutritionByDate(
      new Date(req.body.date),
      req.user.id
    );

    // Extract all the nutritional values of the entries.
    const intakes: Nutrition[] = [];
    nutritions.forEach((e) => {
      intakes.push(e.nutrition);
    });
    console.log(intakes);

    // Compare the intakes to the target to see which nutrition is adequate for that day.
    const fulfilled = await compareNutritionIntakeToTarget(
      intakes,
      req.user.id
    );
    res.json(fulfilled);
  } catch (error) {
    res.status(500).send("Something unexpected has occured. Please try again.");
    console.log(error);
  }
}

export { getNutritionFulfilled };
