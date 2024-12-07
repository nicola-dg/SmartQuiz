import { DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js';
class MultiChoiceQuestion extends Model {
    static initialize(sequelize) {
        MultiChoiceQuestion.init({
            question: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
MultiChoiceQuestion.initialize(sequelize);
export default MultiChoiceQuestion;
