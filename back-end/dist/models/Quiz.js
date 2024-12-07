import { DataTypes, Model } from "sequelize";
import sequelize from "./DatabaseConnection.js";
class Quiz extends Model {
    static initialize(sequelize) {
        Quiz.init({
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            maxErrorNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            link: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
Quiz.initialize(sequelize);
export default Quiz;
