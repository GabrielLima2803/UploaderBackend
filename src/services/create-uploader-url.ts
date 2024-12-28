import { Request, Response } from 'express';
import prisma from '../prisma/client';
import fs from 'fs';
import path from 'path';
import { getMimeType } from '../utils/get-mime-type';
import { v4 as uuidv4 } from 'uuid';

const uploadDir = path.resolve(__dirname, '.././uploads');
const maxFileSize = 500 * 1024 * 1024;

// Certifique-se de que o diretório existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export const createUploaderUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
      return;
    }

    if (req.file.size > maxFileSize) {
      fs.unlinkSync(req.file.path);
      res.status(400).json({ error: 'O tamanho do arquivo excede o limite máximo permitido' });
      return;
    }

    const mimeType = getMimeType(req.file.originalname);

    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(mimeType)) {
      fs.unlinkSync(req.file.path);
      res.status(400).json({ error: 'Tipo de arquivo não suportado' });
      return;
    }

    const fileHash = uuidv4();
    const newFilePath = path.join(uploadDir, req.file.originalname);

    // Move o arquivo para o diretório final com o nome original
    fs.renameSync(req.file.path, newFilePath);

    const uploader = await prisma.file.create({
      data: {
        fileName: req.file.originalname, // Nome original do arquivo
        filePath: newFilePath,          // Caminho no sistema de arquivos
        fileType: mimeType,             // Tipo MIME
        fileHash: fileHash,             // Hash único
        fileUrl: `${req.protocol}://${req.get('host')}/upload/${fileHash}`, // URL com hash
        fileSize: req.file.size,        // Tamanho do arquivo
      },
    });

    res.status(201).json({
      message: 'Arquivo enviado com sucesso',
      uploader,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
