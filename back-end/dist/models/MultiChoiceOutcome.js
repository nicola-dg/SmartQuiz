import { DataTypes, Model } from "sequelize";
import sequelize from "./DatabaseConnection.js";
class Outcome extends Model {
    static initialize(sequelize) {
        Outcome.init({
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Anonymous"
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            isPassed: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            responses: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
Outcome.initialize(sequelize);
export default Outcome;
