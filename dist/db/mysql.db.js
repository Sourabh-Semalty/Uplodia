"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const File_model_1 = __importDefault(require("../model/File.model"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/uplodia";
class Db {
    static async init() {
        await initMongoConnection();
        this.mongooseConnection = mongoose_1.default.connection;
        this.fileModel = new File_model_1.default();
    }
}
exports.Db = Db;
const initMongoConnection = async () => {
    try {
        await mongoose_1.default.connect(uri);
        console.log("MongoDB connection established successfully.");
    }
    catch (error) {
        console.log("Unable to connect to the MongoDB database:", error);
        throw error;
    }
};
