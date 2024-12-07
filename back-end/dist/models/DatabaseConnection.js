import { Sequelize } from "sequelize";
const sequelize = new Sequelize("sqlite:mydatabase.db", {
    dialect: "sqlite"
});
export default sequelize;
