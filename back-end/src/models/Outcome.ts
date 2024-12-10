import { DataTypes, Sequelize, Model } from "sequelize";
import sequelize from "./DatabaseConnection.js";



class Outcome extends Model {
    declare id: number;
    declare username: string;
    declare score: number;
    declare isPassed: boolean;
    declare response: string; //JSON.stringfy(Responses[])
    declare QuizId: number;
    declare UserId: number;


    public static initialize(sequelize: Sequelize): void{
         Outcome.init(
            {
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
                response: {
                    type: DataTypes.STRING,
                    allowNull: true
                }
            },
            {
                sequelize, 
                timestamps: false 
            }
        )
    }
}

Outcome.initialize(sequelize);
export default Outcome;