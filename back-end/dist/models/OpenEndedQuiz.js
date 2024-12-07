import { DataTypes, Model } from "sequelize";
import sequelize from "./DatabaseConnection.js";
class OpenEndedQuiz extends Model {
    // override
    static initialize(sequelize) {
        OpenEndedQuiz.init({
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            link: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            maxErrorNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
OpenEndedQuiz.initialize(sequelize);
export default OpenEndedQuiz;
