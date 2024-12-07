import { DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js';
class OpenEndedQuestion extends Model {
    static initialize(sequelize) {
        OpenEndedQuestion.init({
            question: {
                type: DataTypes.STRING,
                allowNull: false
            },
            correctAnswer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            answer: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
OpenEndedQuestion.initialize(sequelize);
export default OpenEndedQuestion;
