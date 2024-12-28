import schedule from 'node-schedule';
import prisma from '../prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
export const deleteExpiredFiles = async (): Promise<void> => {
  try {
    const expiredFiles = await prisma.file.findMany({
      where: {
        expiresAt: {
          lte: new Date(), 
        },
      },
    });

    for (const file of expiredFiles) {
      await cloudinary.uploader.destroy(file.fileHash);

      await prisma.file.delete({
        where: { id: file.id },
      });

      console.log(`Arquivo ${file.fileName} excluído com sucesso.`);
    }
  } catch (error) {
    console.error('Erro ao excluir arquivos expirados:', error);
  }
};

schedule.scheduleJob('*/5 * * * *', deleteExpiredFiles);
