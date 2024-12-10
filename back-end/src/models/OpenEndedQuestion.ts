import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js'

class OpenEndedQuestion extends Model {
  declare id: number;
  declare question: string;
  declare correctAnswer: string;
  declare answer: string;
  declare QuizId: number;

  public static initialize(sequelize: Sequelize): void{
     OpenEndedQuestion.init(
      {
        question: {
          type: DataTypes.STRING,
          allowNull: false
        },
        correctAnswer:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        answer: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        timestamps: false 
      }
    );
  }
}

OpenEndedQuestion.initialize(sequelize);
export default OpenEndedQuestion;
