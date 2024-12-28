# File Uploader - README

## Requisitos do Projeto

### Funcionalidades Principais

#### 1. Upload de Arquivo
- [ X ] O sistema deve permitir que o usuário envie arquivos através de uma interface ou API.
- [ X ] O backend deve armazenar o arquivo de forma segura e gerar uma URL única para acesso ao arquivo.

#### 2. Geração de URL
- [ X ] Cada arquivo deve ter uma URL única e segura, utilizando hashes ou tokens para evitar acessos indesejados.

#### 3. Download do Arquivo
- [ ] O sistema deve validar a URL ao ser acessada, verificando a validade do token e as permissões de acesso.
- [ X ] O backend deve retornar o arquivo solicitado, desde que a URL seja válida e não tenha expirado.

#### 4. Monitoramento e Logs
- [ ] O sistema deve registrar cada acesso à URL e ao arquivo, incluindo:
  - [ ] IP de origem.
  - [ ] Data e hora do acesso.
- [ ] Essas informações devem ser armazenadas para análise futura e controle de auditoria.

---

### Requisitos Extras (Opcional)
- [ X ] **Expiração Automática de Arquivos:** Deve haver um mecanismo para excluir automaticamente arquivos que ultrapassaram o prazo de validade.
- [ ] **Segurança:** 
  - [ ] Restringir o tamanho máximo dos arquivos enviados.
  - [ ] Garantir que todas as transferências sejam feitas via HTTPS.
- [ ] **Limites e Controle:**
  - [ ] Permitir que o usuário configure o número máximo de downloads permitidos por arquivo.
  - [ ] Notificar o remetente quando o arquivo for baixado.
