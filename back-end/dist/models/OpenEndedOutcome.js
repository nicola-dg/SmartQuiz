import sequelize from './DatabaseConnection.js';
import { DataTypes, Model } from "sequelize";
class OpenEndedOutcome extends Model {
    static initialize(sequelize) {
        OpenEndedOutcome.init({
            username: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "Anonymous"
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isPassed: {
                type: DataTypes.BOOLEAN,
                allowNull: false
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
OpenEndedOutcome.initialize(sequelize);
export default OpenEndedOutcome;
