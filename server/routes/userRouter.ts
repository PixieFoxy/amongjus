import express from "express";
import type { NextFunction, Request, Response } from "express";
import { registerUser } from "../controllers/users/registerUser";
import { validateUniqueEmail } from "../middlewares/validateUniqueEmail";
import { body, validationResult } from "express-validator";
import passport from "passport";
import { checkAuth } from "../middlewares/auth/checkAuth";

const userRouter = express.Router();

userRouter.post(
  "/register",
  // express-validator middleware stack
  [
    body("email")
      .isEmail()
      .custom(async (email) => {
        const existingUser = await validateUniqueEmail(email);
        if (existingUser) throw new Error("Email has already been registered");
      }),
    body("password").notEmpty().isStrongPassword({
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
      minLowercase: 1,
    }),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (result.isEmpty()) registerUser(req, res);
    else {
      console.log(validationResult(req).array());
      res.status(400).send({ errors: result.array() });
    }
  }
);

userRouter.post(
  "/login",
  // express-validator middleware stack
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  (req: Request, res: Response, next: NextFunction) => {
    if (validationResult(req).isEmpty()) {
      next();
    } else {
      console.log(validationResult(req).array());
      res.status(400).send("Invalid input");
    }
  },
  passport.authenticate("local", { failureMessage: true }),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      console.log("User not found");
      res.status(401).send("Incorrect name or password");
    } else {
      res.redirect("/user/getuser");
    }
  }
);

userRouter.get("/getuser", checkAuth, (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json(req.user);
  }
});

userRouter.post(
  "/logout",
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      req.logOut({ keepSessionInfo: false }, function (err) {
        if (err) {
          return next(err);
        }
        console.log("Logout successful!");
        res.clearCookie("connect.sid").sendStatus(204);
      });
    }
  }
);

export { userRouter };
