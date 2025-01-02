import 'dotenv/config'
import './config/cloudinary';
import '../src/middlewares/delete-expired-files';
import express, {Application} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import path from 'path';
import router from './routes/upload-router';

const app: Application = express()
const port:number = 3000;

app.use(cors())
app.use('/files', express.static(path.join(__dirname, './src/uploads')));
app.use(router)
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})