"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessorService = void 0;
const fs_1 = __importDefault(require("fs"));
class FileProcessorService {
    constructor() { }
    static async processFile(file) {
        try {
            console.info(`Processing file: ${file.filename}`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return {
                success: true,
                originalName: file.originalname,
                processedName: file.filename,
                size: file.size,
                mimeType: file.mimetype.split("/")[1],
                processedAt: new Date().toISOString(),
            };
        }
        catch (error) {
            console.error("Error processing file:", error);
            throw new Error("File processing failed");
        }
    }
    static async deleteFile(path) {
        try {
            await fs_1.default.unlinkSync(path);
            return true;
        }
        catch (err) {
            console.error("Error deleting file:", err);
            return false;
        }
    }
}
exports.FileProcessorService = FileProcessorService;
