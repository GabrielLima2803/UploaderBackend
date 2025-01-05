import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const storage = process.env.USE_LOCAL_STORAGE === 'true'

  ? multer.diskStorage({
      destination: function (req: Request, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); 
      },
      filename: function (req: Request, file, cb) {
        cb(null, file.originalname); 
      },
    })
  : multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png|pdf/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos do tipo JPEG, PNG e PDF são permitidos'));
  }
};

// Configura o multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: fileFilter,
});

export default upload;
