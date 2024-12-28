import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { getMimeType } from '../utils/get-mime-type';

const maxFileSize = 500 * 1024 * 1024;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const createUploaderUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
      return;
    }

    if (req.file.size > maxFileSize) {
      res.status(400).json({ error: 'O tamanho do arquivo excede o limite máximo permitido' });
      return;
    }

    const mimeType = getMimeType(req.file.originalname);

    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(mimeType)) {
      res.status(400).json({ error: 'Tipo de arquivo não suportado' });
      return;
    }

    const fileHash = uuidv4();


    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: fileHash,
      resource_type: 'auto', 
    });

    if (!uploadResult) {
      res.status(500).json({ error: 'Falha ao fazer upload para o Cloudinary' });
      return;
    }

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); 

    const uploader = await prisma.file.create({
      data: {
        fileName: req.file.originalname,
        filePath: uploadResult.secure_url, 
        fileType: mimeType,
        fileHash: fileHash,
        fileUrl: `http://localhost:3000/upload/${fileHash}`,
        fileSize: req.file.size,
        expiresAt: expiresAt, 
      },
    });

    res.status(201).json({
      message: 'Arquivo enviado com sucesso para o Cloudinary',
      uploader,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
