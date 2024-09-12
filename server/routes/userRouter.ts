import express from "express";
import type { NextFunction, Request, Response } from "express";
import { registerUser } from "../controllers/users/registerUser";
import { validateUniqueEmail } from "../middlewares/validateUniqueEmail";
import { body, validationResult } from "express-validator";
import passport from "passport";
import { checkAuth } from "../middlewares/auth/checkAuth";
import { profileEdit } from "../controllers/users/profileEdit";
import { getProfile } from "../controllers/users/getProfile";
import { goalEdit } from "../controllers/users/goals/goalEdit";
import { nutritionIntakeCreate } from "../controllers/users/goals/nutritionIntakeCreate";
import { nutritionIntakeUpdate } from "../controllers/users/goals/nutritionIntakeUpdate";
import { nutritionIntakeDelete } from "../controllers/users/goals/nutritionIntakeDelete";
import { getNutritionFulfilled } from "../controllers/users/goals/getNutritionFulfilled";
import { getGoal } from "../controllers/users/goals/getGoal";
import { getNutritionByDate } from "../controllers/users/goals/getNutritionByDate";

const userRouter = express.Router();

// Registering a user based on the request body
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

// Logging in a user based on the request body
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
      res.redirect("/user/get-user");
    }
  }
);

// Getting a logged in user's information
userRouter.get("/get-user", checkAuth, (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json(req.user);
  }
});

// Logging out a user and delete its session
userRouter.post(
  "/logout",
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      req.logOut({ keepSessionInfo: false }, function (err) {
        if (err) {
          return next(err);
        }
        res.clearCookie("connect.sid").sendStatus(204);
      });
    }
  }
);

// POST request to handle profile edit form
userRouter.post("/profile-edit", checkAuth, (req: Request, res: Response) => {
  profileEdit(req, res);
});

// Getting a logged in user's profile
userRouter.get("/get-profile", checkAuth, (req: Request, res: Response) => {
  getProfile(req, res);
});

// Edit goal and calculate target nutrition for that goal
userRouter.post("/goal-edit", checkAuth, (req: Request, res: Response) => {
  goalEdit(req, res);
});

// Create an entry for nutrition intake
userRouter.post(
  "/intake-create",
  checkAuth,
  (req: Request, res: Response, next: NextFunction) => {
    nutritionIntakeCreate(req, res, next);
  }
);

// Update an entry for existing nutrition intake
userRouter.post(
  "/intake-update",
  checkAuth,
  (req: Request, res: Response, next: NextFunction) => {
    nutritionIntakeUpdate(req, res, next);
  }
);

// Delete an entry for existing nutrition intake
userRouter.post(
  "/intake-delete",
  checkAuth,
  (req: Request, res: Response, next: NextFunction) => {
    nutritionIntakeDelete(req, res, next);
  }
);

// Get nutrition by date
userRouter.get(
  "/get-nutrition-badge",
  checkAuth,
  (req: Request, res: Response) => {
    getNutritionFulfilled(req, res);
  }
);

userRouter.post(
  "/get-nutrition",
  checkAuth,
  async (req: Request, res: Response) => {
    if (!req.body.date) res.sendStatus(400);
    const nutritions = await getNutritionByDate(
      new Date(req.body.date),
      req.user.id
    );
    res.json(nutritions);
  }
);
// Get goal
userRouter.get("/get-goal", checkAuth, (req: Request, res: Response) => {
  getGoal(req, res);
});
export { userRouter };
