import { Request, Response } from "express";
import { prisma } from "../../config/prisma/prismaClient";
import { Gender, Prisma } from "@prisma/client";

async function profileEdit(req: Request, res: Response) {
  try {
    if (req.user?.id === undefined) {
      console.log("User undefined in profile-edit");
      return res.sendStatus(401);
    }

    const inputAge = parseInt(req.body.age);
    const inputWeight = parseInt(req.body.weight);
    const inputHeight = parseInt(req.body.height);
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        profile: {
          upsert: {
            create: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              gender:
                req.body.gender === "male"
                  ? Gender.male
                  : req.body.gender === "female"
                  ? Gender.female
                  : req.body.gender === "other"
                  ? Gender.other
                  : Gender.none,
              age: Number.isNaN(inputAge) ? 0 : inputAge,
              weight: Number.isNaN(inputWeight) ? 0 : inputWeight,
              height: Number.isNaN(inputHeight) ? 0 : inputHeight,
              bio: req.body.bio,
            },
            update: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              gender:
                req.body.gender === "male"
                  ? Gender.male
                  : req.body.gender === "female"
                  ? Gender.female
                  : req.body.gender === "other"
                  ? Gender.other
                  : Gender.none,
              age: Number.isNaN(inputAge) ? 0 : inputAge,
              weight: Number.isNaN(inputWeight) ? 0 : inputWeight,
              height: Number.isNaN(inputHeight) ? 0 : inputHeight,
              bio: req.body.bio,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).send("Something unexpected has occured. Please try again.");
    console.log(error);
  }
}

export { profileEdit };
