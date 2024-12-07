import { DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js';
class OpenEndedAnswer extends Model {
    static initialize(sequelize) {
        OpenEndedAnswer.init({
            answer: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
OpenEndedAnswer.initialize(sequelize);
export default OpenEndedAnswer;
