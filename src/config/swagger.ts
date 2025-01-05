import { url } from 'inspector';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Uploader Backend',
            version: '1.0.0',
            description: 'API para upload de imagens para o Cloudinary',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ]
    },
    apis: ['./src/routes/*.ts', './src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };