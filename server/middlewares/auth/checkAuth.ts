import { NextFunction, Request, Response } from "express";


function checkAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        console.log("AUTHENTICATED!");
        return next()
    }
    res.status(401).send("Please authorise yourself!");
}

export { checkAuth } ;