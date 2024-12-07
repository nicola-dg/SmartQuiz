var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { NotificationController } from "../controllers/NotificationController.js";
import { ensureUsersModifyOnlyOwnNotifications } from "../middleware/authorization.js";
const NotificationRouter = express.Router();
NotificationRouter.get("/notification", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    NotificationController.getAllNotification(req, res).then((notifications) => res.json(notifications)).catch((err) => next(err));
}));
NotificationRouter.delete("/notification/:outcomeId", ensureUsersModifyOnlyOwnNotifications, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    NotificationController.deleteNotificationByOutcomeId(req, res).then((notificationDeletedCount) => res.json(notificationDeletedCount)).catch((err) => next(err));
}));
export default NotificationRouter;
