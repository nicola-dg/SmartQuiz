import { where } from "sequelize";
import { Notification } from "../models/Database.js";
import { Request, Response } from "express";

export class NotificationController{


    static async createNotification(req: Request, res: Response) : Promise<Notification>{
        const notification = req.body as Notification;
        return Notification.create({...notification});
    }

    static async getAllNotification(req: Request, res: Response) : Promise<Notification[]>{
        const userId = req.body.userId;
            return Notification.findAll({
                where: {
                  UserId: userId,
                },
              });
    }

    static async deleteNotificationByOutcomeId(req: Request, res: Response){
        const OutcomeId = req.params.outcomeId;
        return Notification.destroy({
            where:{
                OutcomeId: OutcomeId
            }
        })
    }
}