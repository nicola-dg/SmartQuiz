import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "./DatabaseConnection.js";


class Quiz extends Model{
   
    declare id: number;
    declare title: string;
    declare description: string;
    declare maxErrorNumber: number;
    declare link: string;
    declare UserId: number;

    public static initialize(sequelize: Sequelize): void {
        Quiz.init(
            {
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
            },
            {
              sequelize,
              timestamps: false 
            }
          );
    }
}

Quiz.initialize(sequelize);
export default Quiz;