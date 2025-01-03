# Projeto de Upload de Imagens para o Cloudinary

Este projeto permite o upload de imagens para o Cloudinary e retorna um link direto para o download da imagem. A API foi construída para simplificar o processo de upload e fornecer um link direto para acessar a imagem enviada.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express.js**: Framework para construir a API RESTful.
- **Cloudinary**: Serviço de hospedagem de imagens na nuvem.
- **Prisma**: ORM para interagir com o banco de dados.
- **TypeScript**: Linguagem para garantir tipagem estática e melhorar a qualidade do código.
- **Docker**: Contêinerização do ambiente para facilitar a execução do projeto.


## Funcionalidades

- **Upload de Imagens**: Permite o envio de imagens via API.
- **Armazenamento na Nuvem (Cloudinary)**: As imagens são enviadas para o Cloudinary, onde ficam armazenadas de forma segura e otimizada.
- **Geração de Link de Download**: Após o upload, a API retorna um link que pode ser usado para acessar ou baixar a imagem.

## Instalação

Para rodar este projeto localmente, siga os passos abaixo:

### 1. Clone o repositório

```bash 
git clone https://github.com/GabrielLima2803/UploaderBackend.git
