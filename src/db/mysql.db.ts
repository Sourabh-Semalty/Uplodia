import { Sequelize } from "sequelize";
import FileMode from "../model/File.model";

export class Db {
  static sequelize: Sequelize;
  static fileModel: FileMode;

  static async init() {
    this.sequelize = await initMysqlConnection();
    this.fileModel = new FileMode(this.sequelize);
  }
}

const initMysqlConnection = async () => {
  try {
    const sequelize = new Sequelize("uploadia", "root", "root", {
      host: "localhost",
      port: 3306,
      dialect: "mysql",
    });
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return sequelize;
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    throw error;
  }
};
