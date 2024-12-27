import { Model, DataTypes, Sequelize } from "sequelize";

class File extends Model {
  public id!: string;
  public name!: string;
  public path!: string;
  public type!: string;
  public status!: "processing" | "completed" | "failed" | "uploaded";
  public uploaded_at!: Date;
}

export default class FileModel {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
    this.initModel();
  }

  private async initModel() {
    File.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("processing", "completed", "failed", "uploaded"),
          allowNull: false,
        },
        uploaded_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize: this.sequelize,
        modelName: "File",
      }
    );
    // Ensure the model is synchronized with the database
    await this.sequelize.sync();
  }

  async create(data: Partial<File>) {
    return await File.create(data);
  }

  async findAll() {
    return await File.findAll();
  }

  async findByPk(id: string) {
    return await File.findByPk(id);
  }

  async deleteByPk(condition: { id: string }) {
    return await File.destroy({ where: condition });
  }

  async update(data: Partial<File>, condition: { id: string }) {
    return await File.update(data, { where: condition });
  }
}
