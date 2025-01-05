# 🚀 Projeto de Upload de Imagens para o Cloudinary

[![Coverage](https://img.shields.io/codecov/c/github/GabrielLima2803/UploaderBackend)](https://codecov.io/gh/GabrielLima2803/UploaderBackend)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2014.x-green)](https://nodejs.org/en/)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-%3E%3D%2020.x-blue)](https://docs.docker.com/)
[![Last Commit](https://img.shields.io/github/last-commit/GabrielLima2803/UploaderBackend)](https://github.com/GabrielLima2803/UploaderBackend)

Este projeto permite o upload de imagens para o Cloudinary e retorna um link direto para o download da imagem. A API foi construída para simplificar o processo de upload e fornecer um link direto para acessar a imagem enviada.

## 🛠 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/en/)**: Ambiente de execução para JavaScript. 
- **[Express.js](https://expressjs.com/)**: Framework para construir a API RESTful. 
- **[Cloudinary](https://cloudinary.com/documentation)**: Serviço de hospedagem de imagens na nuvem. 
- **[Prisma](https://www.prisma.io/docs/)**: ORM para interagir com o banco de dados. 
- **[TypeScript](https://www.typescriptlang.org/docs/)**: Linguagem para garantir tipagem estática e melhorar a qualidade do código. 
- **[Docker](https://docs.docker.com/)**: Contêinerização do ambiente para facilitar a execução do projeto. 
- **[Swagger](https://swagger.io/docs/)**: Ferramenta para documentação da API.
- **[node-schedule](https://www.npmjs.com/package/node-schedule)**: Biblioteca para agendar tarefas de forma automatizada, como a exclusão de imagens expiradas. 

## 🔧 Funcionalidades

- **Upload de Imagens**: Permite o envio de imagens via API. 📸
- **Armazenamento na Nuvem (Cloudinary)**: As imagens são enviadas para o Cloudinary, onde ficam armazenadas de forma segura e otimizada. ☁️
- **Geração de Link de Download**: Após o upload, a API retorna um link que pode ser usado para acessar ou baixar a imagem. 🔗
- **Exclusão Automática de Imagens Expiradas**: Utilizando o `node-schedule`, o sistema apaga imagens automaticamente após um período de expiração determinado (30 minutos). 🗑️

## 🏗 Instalação

Para rodar este projeto localmente, siga os passos abaixo:

### 1. Clone o repositório

```bash 
git clone https://github.com/GabrielLima2803/UploaderBackend.git
 ```
 ### 2. Acesse o diretório do projeto

```bash 
cd UploaderBackend
 ```
 ### 3. Instale as dependências

```bash 
npm install
 ```

### 4. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash 
DATABASE_URL="postgresql://root:root@localhost:5432/seu-db"
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
PORT=3000
USE_LOCAL_STORAGE=false
NODE_ENV=production
 ```
 
### 5. Execute o banco de dados com Docker (se aplicável)

```bash 
docker-compose up -d
 ```

### 6. Inicie o servidor

```bash 
npm run dev
 ```

## 📚 Documentação da API

A documentação da API pode ser acessada através do Swagger, que está configurado no projeto. Ao iniciar o servidor, acesse o Swagger em `http://localhost:3000/api/swagger` para ver todos os endpoints disponíveis e como utilizá-los.

## 🛠 Testes

### 1. Testando o Upload de Imagens

- **Endpoint**: `POST /uploads`
- **Body**: Envie uma imagem como `multipart/form-data`.
- **Resposta**: A resposta retornará o link para a imagem armazenada no Cloudinary.

### 2. Testando a Geração de Link de Download

- **Endpoint**: `GET /uploads/:fileHash`
- **Parâmetro**: `fileHash` - O ID público da imagem no Cloudinary.
- **Resposta**: O link para download da imagem será retornado.


## 🎥 Demonstração

Veja a aplicação em ação no vídeo abaixo:

![Demonstração](docs/demostracao-uploader.gif)
