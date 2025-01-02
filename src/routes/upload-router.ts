import express from 'express';
import { createUploaderUrl } from '../services/create-uploader-url';
import upload from '../middlewares/multer';
import { downloadImage } from './../services/donwloand-image';

const router = express.Router();

router.post('/upload/', upload.array('files', 10), (req, res, next) => {
    next();
  }, 
  createUploaderUrl);
  router.get('/upload/:fileHash', downloadImage);


export default router;