import path from "path";
import multer from "multer";
import uniqid from "uniqid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null, "dist/uploads/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${uniqid()}${extension}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|zip/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          filetypes
      )
    );
  },
});
