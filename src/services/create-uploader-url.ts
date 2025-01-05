import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import { getMimeType } from '../utils/get-mime-type';
import fs from 'fs';
import path from 'path';

const maxFileSize = 500 * 1024 * 1024;

export const createUploaderUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
      return;
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {

        if (file.size > maxFileSize) {
          throw new Error(`O arquivo ${file.originalname} excede o limite de tamanho permitido`);
        }

        const mimeType = getMimeType(file.originalname);
        if (!['image/png', 'image/jpeg', 'application/pdf'].includes(mimeType)) {
          throw new Error(`Tipo de arquivo não suportado: ${file.originalname}`);
        }

        const fileHash = uuidv4();

        if (process.env.USE_LOCAL_STORAGE === 'true') {
          const uploadPath = path.join(__dirname, '../uploads', fileHash + path.extname(file.originalname));

          const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
          return await prisma.file.create({
            data: {
              fileName: file.originalname,
              filePath: uploadPath,
              fileType: file.mimetype,
              fileHash: fileHash,
              fileUrl: `http://localhost:3000/uploads/${fileHash}`,
              fileSize: file.size,
              expiresAt: expiresAt,
            },
          });
        } else {
          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
              { public_id: fileHash, resource_type: 'auto' },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
            stream.end(file.buffer); 
          });

          if (!uploadResult || !(uploadResult as any).secure_url) {
            throw new Error(`Falha ao fazer upload do arquivo: ${file.originalname}`);
          }

          const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
          return await prisma.file.create({
            data: {
              fileName: file.originalname,
              filePath: (uploadResult as any).secure_url,
              fileType: file.mimetype,
              fileHash: fileHash,
              fileUrl: `http://localhost:3000/uploads/${fileHash}`,
              fileSize: file.size,
              expiresAt: expiresAt,
            },
          });
        }
      })
    );

    res.status(201).json({
      message: 'Arquivos enviados com sucesso',
      uploadedFiles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message || 'Erro interno do servidor' });
  }
};
