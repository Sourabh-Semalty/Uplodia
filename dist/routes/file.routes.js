"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("../controller/file.controller");
const multer_config_1 = require("../config/multer.config");
const fileRouter = express_1.default.Router();
fileRouter
    .get("/", file_controller_1.getUploadedFiles)
    .get("/download/:id", file_controller_1.downloadFile)
    .post("/upload", multer_config_1.handleMulterUpload, file_controller_1.uploadFile)
    .patch("/update/:id", file_controller_1.updateFile)
    .delete("/delete/:id", file_controller_1.deleteFile);
exports.default = fileRouter;
