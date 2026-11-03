import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(8).toString('hex') + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (fileExtension !== '.md') {
    const error = new Error("Only .md files are allowed");
    error.status = 400;
    return cb(error, false);
    } else {
        cb(null, true);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;

