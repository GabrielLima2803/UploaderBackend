import express from 'express';
import { createUploaderUrl } from '../services/create-uploader-url';
import upload from '../middlewares/multer';
import { downloadImage } from './../services/donwloand-image';

const router = express.Router();

/**
 * @swagger
 * /uploads/:
 *   post:
 *     summary: Faz o upload de múltiplos arquivos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso.
 *       400:
 *         description: Erro no envio dos arquivos.
 */
router.post('/uploads/', upload.array('files', 10), (req, res, next) => {
    next();
}, createUploaderUrl);

/**
 * @swagger
 * /uploads/{fileHash}:
 *   get:
 *     summary: Baixa um arquivo enviado pelo hash
 *     parameters:
 *       - in: path
 *         name: fileHash
 *         required: true
 *         schema:
 *           type: string
 *         description: Hash do arquivo para download
 *     responses:
 *       200:
 *         description: Arquivo baixado com sucesso.
 *       404:
 *         description: Arquivo não encontrado.
 */
router.get('/uploads/:fileHash', downloadImage);

export default router;
