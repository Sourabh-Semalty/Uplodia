import { FileProcessingResult } from "../types/type";
import fs from "fs";

export class FileProcessorService {
  constructor() {}

  static async processFile(
    file: Express.Multer.File
  ): Promise<FileProcessingResult> {
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
    } catch (error) {
      console.error("Error processing file:", error);
      throw new Error("File processing failed");
    }
  }

  static async deleteFile(path: string) {
    try {
      await fs.unlinkSync(path);
      return true;
    } catch (err) {
      console.error("Error deleting file:", err);
      return false;
    }
  }
}
