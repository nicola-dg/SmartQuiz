import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize("sqlite:mydatabase.db", {
    dialect: "sqlite"
});

export default sequelize;