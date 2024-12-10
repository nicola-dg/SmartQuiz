import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js'

class MultiChoiceQuestion extends Model {
  declare id: number;
  declare question: string;
  declare QuizId: number;

  public static initialize(sequelize: Sequelize): void{
    MultiChoiceQuestion.init(
      {
        question: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        timestamps: false 
      }
    );
  }
}

MultiChoiceQuestion.initialize(sequelize);
export default MultiChoiceQuestion;
