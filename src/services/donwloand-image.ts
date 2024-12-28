import { Request, Response } from 'express';
import prisma from '../prisma/client';
import axios from 'axios';
import { Stream } from 'stream';

export const downloadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileHash } = req.params;

    const fileRecord = await prisma.file.findUnique({
      where: { fileHash },
    });

    if (!fileRecord) {
      res.status(404).send('Arquivo não encontrado no banco de dados');
      return;
    }

    console.log(fileRecord);

    const response = await axios.get<Stream>(fileRecord.filePath, { responseType: 'stream' });

    res.setHeader('Content-Disposition', `attachment; filename="${fileRecord.fileName}"`);
    res.setHeader('Content-Type', fileRecord.fileType || 'application/octet-stream');

    response.data.pipe(res).on('error', (err: any) => {
      console.error('Erro ao transmitir o arquivo:', err);
      res.status(500).send('Erro ao transmitir o arquivo');
    });
  } catch (error) {
    console.error('Erro ao processar o download:', error);
    res.status(500).send('Erro interno do servidor');
  }
};
