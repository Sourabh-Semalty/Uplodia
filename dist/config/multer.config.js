"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMulterUpload = exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uniqid_1 = __importDefault(require("uniqid"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/tmp/");
    },
    filename: (req, file, cb) => {
        const extension = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}-${(0, uniqid_1.default)()}${extension}`);
    },
});
// File filter function
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|zip/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    if (!mimetype || !extname) {
        const error = new Error("Invalid file type. Only jpeg, jpg, png, pdf, and zip files are allowed");
        error.code = "INVALID_FILE_TYPE";
        return cb(error);
    }
    cb(null, true);
};
// Multer upload configuration
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2MB limit
    },
    fileFilter: fileFilter,
}).single("file");
// Custom middleware to handle multer errors
const handleMulterUpload = (req, res, next) => {
    (0, exports.upload)(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
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
        }
        else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        next();
    });
};
exports.handleMulterUpload = handleMulterUpload;
