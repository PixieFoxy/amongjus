import { prisma } from "../../config/prisma/prismaClient";
import type { Request, Response } from "express";
import { hashPassword } from "../../middlewares/hashPassword";
import { Prisma, Role } from "@prisma/client";

async function registerUser(req: Request, res: Response) {
    try {
        const hashed: string = await hashPassword(req.body.password);
        const newUser: Prisma.UserCreateInput = {
            email: req.body.email,
            password: hashed,
            role: Role.USER
        };
        var createdUser = await prisma.user.create({
            data: newUser
        });
        if (!createdUser)
            res.status(500).send("The user has not been registered successfully. Please try again.");
        else {
            res.status(200).send("User has been successfully registered.");
        }
    }
    catch (error) {
        res.status(500).send("Something unexpected has occured. Please try again.");
        console.error(error);
    }
}

export { registerUser } ;