import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import prisma from '../prisma/client';

const uploadDir = path.resolve(__dirname, '.././uploads'); 

export const downloadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileHash } = req.params;

    const fileRecord = await prisma.file.findUnique({
      where: { fileHash: fileHash },
    });

    if (!fileRecord) {
      res.status(404).send('Arquivo não encontrado no banco de dados');
      return;
    }

    const filePath = path.join(uploadDir, fileRecord.fileName);

    console.log('Procurando o arquivo em:', filePath);

    if (fs.existsSync(filePath)) {
      res.download(filePath, (err) => {
        if (err) {
          console.error('Erro ao baixar o arquivo:', err);
          res.status(500).send('Erro ao baixar o arquivo');
        }
      });
    } else {
      res.status(404).send('Arquivo não encontrado no sistema de arquivos');
    }
  } catch (error) {
    console.error('Erro ao processar download:', error);
    res.status(500).send('Erro interno do servidor');
  }
};
