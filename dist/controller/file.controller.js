"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFile = exports.deleteFile = exports.downloadFile = exports.getUploadedFiles = exports.uploadFile = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const fileProcessor_service_1 = require("../services/fileProcessor.service");
const mysql_db_1 = require("../db/mysql.db");
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const result = await fileProcessor_service_1.FileProcessorService.processFile(req.file);
        const uniqueId = (0, uniqid_1.default)();
        await mysql_db_1.Db.fileModel.create({
            id: uniqueId,
            name: req.file.originalname,
            type: req.file.mimetype.split("/")[1],
            path: req.file.path,
            status: result.success ? "completed" : "failed",
            uploaded_at: new Date(),
        });
        res.status(200).json({
            message: "File uploaded and processed successfully",
            data: result,
        });
    }
    catch (error) {
        // logger.error("Error in file upload:", error);
        res.status(500).json({ errorMessage: "File upload failed", error });
    }
};
exports.uploadFile = uploadFile;
const getUploadedFiles = async (req, res) => {
    try {
        const files = await mysql_db_1.Db.fileModel.findAll();
        res.status(200).json({ files });
    }
    catch (error) {
        // logger.error("Error in getting uploaded files:", error);
        res
            .status(500)
            .json({ errorMessage: "Failed to get uploaded files", error });
    }
};
exports.getUploadedFiles = getUploadedFiles;
const downloadFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await mysql_db_1.Db.fileModel.findByPk(id);
        if (!file) {
            res.status(404).json({ error: "File not found" });
            return;
        }
        res.download(file.path, file.name);
    }
    catch (error) {
        // logger.error("Error in downloading file:", error);
        res.status(500).json({ errorMessage: "Failed to download file", error });
    }
};
exports.downloadFile = downloadFile;
const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await mysql_db_1.Db.fileModel.findByPk(id);
        if (!file) {
            res.status(404).json({ error: "File not found" });
            return;
        }
        const { path } = file;
        const isDeleted = await fileProcessor_service_1.FileProcessorService.deleteFile(path);
        if (!isDeleted) {
            res.status(500).json({ error: "Failed to delete file" });
            return;
        }
        await mysql_db_1.Db.fileModel.deleteByPk({ id });
        res.status(200).json({ message: "File deleted successfully" });
    }
    catch (error) {
        // logger.error("Error in deleting file:", error);
        res.status(500).json({ errorMessage: "Failed to delete file", error });
    }
};
exports.deleteFile = deleteFile;
const updateFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const file = await mysql_db_1.Db.fileModel.findByPk(id);
        if (!file) {
            res.status(404).json({ error: "File not found" });
            return;
        }
        await mysql_db_1.Db.fileModel.update({ name }, { id });
        res.status(200).json({ message: "File updated successfully" });
    }
    catch (error) {
        // logger.error("Error in updating file:", error);
        res.status(500).json({ errorMessage: "Failed to update file", error });
    }
};
exports.updateFile = updateFile;
