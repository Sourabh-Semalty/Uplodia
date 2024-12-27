import { Request, Response } from "express";
import uniqid from "uniqid";
import { FileProcessorService } from "../services/fileProcessor.service";
import { Db } from "../db/mysql.db";

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const result = await FileProcessorService.processFile(req.file);

    const uniqueId = uniqid();
    await Db.fileModel.create({
      id: uniqueId,
      name: req.file.originalname,
      type: req.file.mimetype,
      path: req.file.path,
      status: result.success ? "completed" : "failed",
      uploaded_at: new Date(),
    });
    res.status(200).json({
      message: "File uploaded and processed successfully",
      data: result,
    });
  } catch (error) {
    // logger.error("Error in file upload:", error);
    res.status(500).json({ errorMessage: "File upload failed", error });
  }
};

export const getUploadedFiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = await Db.fileModel.findAll();
    res.status(200).json({ files });
  } catch (error) {
    // logger.error("Error in getting uploaded files:", error);
    res
      .status(500)
      .json({ errorMessage: "Failed to get uploaded files", error });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const file = await Db.fileModel.findByPk(id);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    res.download(file.path, file.name);
  } catch (error) {
    // logger.error("Error in downloading file:", error);
    res.status(500).json({ errorMessage: "Failed to download file", error });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const file = await Db.fileModel.findByPk(id);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    const { path } = file;
    const isDeleted = await FileProcessorService.deleteFile(path);
    if (!isDeleted) {
      res.status(500).json({ error: "Failed to delete file" });
      return;
    }
    await Db.fileModel.deleteByPk({ id });
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    // logger.error("Error in deleting file:", error);
    res.status(500).json({ errorMessage: "Failed to delete file", error });
  }
};

export const updateFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const file = await Db.fileModel.findByPk(id);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    await Db.fileModel.update({ name }, { id });
    res.status(200).json({ message: "File updated successfully" });
  } catch (error) {
    // logger.error("Error in updating file:", error);
    res.status(500).json({ errorMessage: "Failed to update file", error });
  }
};
