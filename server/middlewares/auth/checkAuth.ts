import { NextFunction, Request, Response } from "express";


function checkAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(401).send("Please authorise yourself!");
}

export { checkAuth } ;