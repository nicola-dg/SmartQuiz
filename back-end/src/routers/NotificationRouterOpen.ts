
import express, { NextFunction, Request, Response } from "express";
import { NotificationController } from "../controllers/NotificationController.js";
import { Notification } from "../models/Database.js"

const NotificationRouterOpen = express.Router();

NotificationRouterOpen.post("/notification", async (req: Request, res: Response, next: NextFunction) =>{
    NotificationController.createNotification(req, res).then((notification: Notification) => res.json(notification)
    ).catch((err: Error) => next(err));
})


export default NotificationRouterOpen
