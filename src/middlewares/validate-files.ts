import { Request, Response, NextFunction } from 'express';

export function validateFile(req: Request, res: Response, next: NextFunction) {
  const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
  const { fileType } = req.body;

  if (!allowedTypes.includes(fileType)) {
    return res.status(400).json({ error: 'Tipo de arquivo não suportado' });
  }
  next();
}
