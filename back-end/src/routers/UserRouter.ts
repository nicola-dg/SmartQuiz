
import express, { NextFunction, Request, Response } from "express";
import UserController from "../controllers/UserController.js";
import User from "../models/User.js";

const UserRouter = express.Router();


UserRouter.get("/user/:id", async (req: Request, res: Response, next: NextFunction) =>{
    UserController.getUserById(req).then((user: User) => res.json(user)
    ).catch((err: Error) => next(err));
})

export default UserRouter
