import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js'

class MultiChoiceAnswer extends Model {
  declare id: number;
  declare answer: string;
  declare isCorrect: boolean;
  declare MultiChoiceQuestionId: number;
  declare QuizId: number;

  public static initialize(sequelize: Sequelize): void{
    MultiChoiceAnswer.init(
      {
        answer: {
          type: DataTypes.STRING,
          allowNull: false
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
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

MultiChoiceAnswer.initialize(sequelize);
export default MultiChoiceAnswer;
