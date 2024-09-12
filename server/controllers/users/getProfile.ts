import { Request, Response } from "express";
import { prisma } from "../../config/prisma/prismaClient";

async function getProfile(req: Request, res: Response) {
  try {
    if (req.user?.id === undefined) {
      console.log("User undefined in get-profile");
      return res.sendStatus(401);
    }

    const profile = await prisma.profile.findFirst({
      where: {
        userId: req.user.id,
      },
      select: {
        firstName: true,
        lastName: true,
        gender: true,
        age: true,
        weight: true,
        height: true,
        bio: true,
      },
    });
    res.json(profile);
  } catch (error) {
    res.status(500).send("Something unexpected has occured. Please try again.");
    console.log(error);
  }
}

export { getProfile };
