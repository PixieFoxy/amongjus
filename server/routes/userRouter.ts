import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { registerUser } from '../controllers/users/registerUser';
import { validateUniqueEmail } from '../middlewares/validateUniqueEmail';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import { checkAuth } from '../middlewares/auth/checkAuth';

const userRouter = express.Router();

userRouter.post(
    '/register',
    // express-validator middleware stack
    [
        body('email').isEmail().custom(async email => {
            const existingUser = await validateUniqueEmail(email);
            if (existingUser) 
                throw new Error("Email has already been registered.");
        }),
        body('password').notEmpty().isStrongPassword({
            minLength: 8,
            minSymbols: 1,
            minNumbers: 1,
            minUppercase: 1
        }),
    ],
    (req: Request, res: Response, next: NextFunction) => {
        if (validationResult(req).isEmpty())
            registerUser(req, res)
        else {
            console.log(validationResult(req).array())
            res.status(400).send("Invalid input.");
        }
    }
);

userRouter.post(
    '/login',
    // express-validator middleware stack
    [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty()
    ],
    (req: Request, res: Response, next: NextFunction) => {
        if (validationResult(req).isEmpty()) {
            next();
        }
        else {
            console.log(validationResult(req).array())
            res.status(400).send("Invalid input.");
        }
    },
    passport.authenticate('local', { failureMessage: true }),
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            console.log("User not found");
            res.status(401).send("Incorrect name or password");
        }
        else {
            res.redirect('/user/dashboard');
        }
    }
)

userRouter.get('/dashboard', checkAuth, (req: Request, res: Response) => {
    console.log("Hello from dashboard!");
    res.send(req.user);
})

export { userRouter } ;