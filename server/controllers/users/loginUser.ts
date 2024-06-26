import { prisma } from "../../config/prisma/prismaClient";
import * as bcrypt from "bcrypt";
import type { Request, Response } from "express";

async function loginUser(req: Request, res: Response) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (!user)
            res.status(401).send("Invalid credentials");
        else if (!await bcrypt.compare(req.body.password, user.password))
            res.status(401).send("Invalid credentials (password)");
        else // valid user found
            res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send("Something unexpected has occured. Please try again.");
        console.error(error);
    }
}

export { loginUser } ;