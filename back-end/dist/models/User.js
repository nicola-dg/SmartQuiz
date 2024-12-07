import { createHash } from 'crypto';
import { DataTypes, Model } from 'sequelize';
import sequelize from './DatabaseConnection.js';
class User extends Model {
    static initialize(sequelize) {
        User.init({
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value) {
                    let hash = createHash("sha256");
                    this.setDataValue('password', hash.update(value).digest("hex"));
                }
            }
        }, {
            sequelize,
            timestamps: false
        });
    }
}
User.initialize(sequelize);
export default User;
