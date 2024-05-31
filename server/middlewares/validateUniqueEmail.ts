import { prisma } from "../config/prismaClient";


async function validateUniqueEmail(emailInput: string) {
    return prisma.user.findUnique({
        where: {
            email: emailInput
        }
    });
}

export { validateUniqueEmail } ;