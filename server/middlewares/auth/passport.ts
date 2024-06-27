import passport from 'passport';
import { Strategy } from 'passport-local';
import { prisma } from '../../config/prisma/prismaClient';
import * as bcrypt from 'bcrypt';

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    async function (_req: Express.Request, email: string, password: string, done) {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            console.log("Incorrect credentials (user)");
            return done(null, false, { message: "Incorrect credentials (user)" });
        }

        if (!await bcrypt.compare(password, user.password)) {
            console.log("Incorrect credentials (password)");
            return done(null, false, { message: "Incorrect credentials (password)" });
        }

        return done(null, user);
}))

passport.serializeUser(function(user: any, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                role: true
            }
        });
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
})

export { passport } ;