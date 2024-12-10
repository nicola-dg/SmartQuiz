
import express, { NextFunction, Request, Response } from "express";
import { NotificationController } from "../controllers/NotificationController.js";
import { Notification } from "../models/Database.js"
import { ensureUsersModifyOnlyOwnNotifications } from "../middleware/authorization.js";

const NotificationRouter = express.Router();


NotificationRouter.get("/notification", async (req: Request, res: Response, next: NextFunction) =>{
    NotificationController.getAllNotification(req, res).then((notifications: Notification[]) => res.json(notifications)
    ).catch((err: Error) => next(err));
})


NotificationRouter.delete("/notification/:outcomeId", ensureUsersModifyOnlyOwnNotifications ,async (req: Request, res: Response, next: NextFunction) =>{
    NotificationController.deleteNotificationByOutcomeId(req, res).then((notificationDeletedCount: number) => res.json(notificationDeletedCount)
    ).catch((err: Error) => next(err));
})


export default NotificationRouter
