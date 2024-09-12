import { Request, Response } from "express";
import { prisma } from "../../../config/prisma/prismaClient";

async function getGoal(req: Request, res: Response) {
  try {
    if (req.user.id === undefined) {
      console.log("User undefined in get-goal");
      return res.sendStatus(401);
    }

    const goal = await prisma.profile.findUnique({
      where: {
        userId: req.user.id,
      },
      select: {
        goal: {
          include: {
            targetNutrition: {
              select: {
                energy: true,
                fat: true,
                carbs: true,
                protein: true,
                fibre: true,
                sugar: true,
                sodium: true
              }
            }
          },
        },
      },
    });
    res.json(goal);
  } catch (error) {
    res.status(500).send("Something unexpected has occured. Please try again.");
    console.log(error);
  }
}

export { getGoal };
