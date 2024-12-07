import { DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js';
class MultiChoiceAnswer extends Model {
    static initialize(sequelize) {
        MultiChoiceAnswer.init({
            answer: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isCorrect: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
MultiChoiceAnswer.initialize(sequelize);
export default MultiChoiceAnswer;
