import { createHash } from 'crypto';
import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js'

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;

  public static initialize(sequelize: Sequelize): void{
     User.init(
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        email:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value: string) { 
            let hash = createHash("sha256");    
            this.setDataValue('password', hash.update(value).digest("hex"));
          }
        }
        
      },
      {
        sequelize,
        timestamps: false 
      }
    );
  }
}

User.initialize(sequelize);
export default User;
