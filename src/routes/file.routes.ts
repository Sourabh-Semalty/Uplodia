import express from "express";
import {
  deleteFile,
  downloadFile,
  getUploadedFiles,
  updateFile,
  uploadFile,
} from "../controller/file.controller";
import { upload } from "../config/multer.config";

const fileRouter = express.Router();

fileRouter
  .get("/", getUploadedFiles)
  .get("/download/:id", downloadFile)
  .post("/upload", upload.single("file"), uploadFile)
  .patch("/update/:id", updateFile)
  .delete("/delete/:id", deleteFile);

export default fileRouter;
