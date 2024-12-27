import mongoose from "mongoose";
import FileMode from "../model/File.model";

const uri =
  "mongodb+srv://uplodia:DGwB5rLfhRrmaXlJ@uplodia.073eq.mongodb.net/?retryWrites=true&w=majority&appName=uplodia";

export class Db {
  static mongooseConnection: mongoose.Connection;
  static fileModel: FileMode;

  static async init() {
    await initMongoConnection();
    this.mongooseConnection = mongoose.connection;
    this.fileModel = new FileMode();
  }
}

const initMongoConnection = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connection established successfully.");
  } catch (error) {
    console.log("Unable to connect to the MongoDB database:", error);
    throw error;
  }
};
