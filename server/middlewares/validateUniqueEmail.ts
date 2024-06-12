import { prisma } from "../config/prisma/prismaClient";


async function validateUniqueEmail(emailInput: string) {
    return prisma.user.findUnique({
        where: {
            email: emailInput
        }
    });
}

export { validateUniqueEmail } ;