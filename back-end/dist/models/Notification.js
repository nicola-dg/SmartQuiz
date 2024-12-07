import sequelize from './DatabaseConnection.js';
import { DataTypes, Model } from "sequelize";
class Notification extends Model {
    static initialize(sequelize) {
        Notification.init({
            quizTitle: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            responderUserName: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Anonymous"
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
Notification.initialize(sequelize);
export default Notification;
