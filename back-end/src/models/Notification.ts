import sequelize from './DatabaseConnection.js';
import { DataTypes, Model, Sequelize } from "sequelize";

class Notification extends Model {
    declare id: number;
    declare quizTitle: string;
    declare responderUserName: string;
    declare UserId: number;
    declare OutcomeId: number;
    declare QuizId: number;

    public static initialize(sequelize: Sequelize): void{
         Notification.init(
            {
                quizTitle: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                responderUserName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "Anonymous"
                }
            },
            {
                sequelize, 
                timestamps: false 
            }
        )
    }
}

Notification.initialize(sequelize);
export default Notification;