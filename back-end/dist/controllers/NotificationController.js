var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Notification } from "../models/Database.js";
export class NotificationController {
    static createNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = req.body;
            return Notification.create(Object.assign({}, notification));
        });
    }
    static getAllNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            return Notification.findAll({
                where: {
                    UserId: userId,
                },
            });
        });
    }
    static deleteNotificationByOutcomeId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const OutcomeId = req.params.outcomeId;
            return Notification.destroy({
                where: {
                    OutcomeId: OutcomeId
                }
            });
        });
    }
}
