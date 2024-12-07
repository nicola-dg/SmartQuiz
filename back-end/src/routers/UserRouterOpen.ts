
import express, { NextFunction, Request, Response } from "express";
import UserController, { OpenUser } from "../controllers/UserController.js";


const UserRouterOpen = express.Router();


UserRouterOpen.get("/user/:id/openinfo", async (req: Request, res: Response, next: NextFunction) =>{
    UserController.getOpenUserById(req).then((user: OpenUser) => res.json(user)
    ).catch((err: Error) => next(err));
})

export default UserRouterOpen;