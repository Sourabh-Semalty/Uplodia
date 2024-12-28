import path from "path";
import multer from "multer";
import uniqid from "uniqid";
import { Request, Response, NextFunction } from "express";

// Custom error types for multer
export interface MulterError extends Error {
  code?: string;
  field?: string;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${uniqid()}${extension}`);
  },
});

// File filter function
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|pdf|zip/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (!mimetype || !extname) {
    const error: MulterError = new Error(
      "Invalid file type. Only jpeg, jpg, png, pdf, and zip files are allowed"
    );
    error.code = "INVALID_FILE_TYPE";
    return cb(error);
  }

  cb(null, true);
};

// Multer upload configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB limit
  },
  fileFilter: fileFilter,
}).single("file");

// Custom middleware to handle multer errors
export const handleMulterUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size exceeds the 2MB limit",
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
};
