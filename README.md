# 🎉 Bot de Aniversariantes para Slack

Este é um bot desenvolvido em Node.js que lê uma planilha pública do Google Sheets contendo dados de colaboradores e envia mensagens personalizadas de aniversário no Slack, incluindo frases divertidas e GIFs temáticos.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** – Plataforma de desenvolvimento backend.
- **Slack Web API** – Para envio de mensagens e identificação de usuários.
- **Giphy API** – Para buscar GIFs dinâmicos com tema de aniversário.
- **Google Sheets** – Usado como base de dados de aniversariantes.
- **dotenv** – Gerenciamento de variáveis de ambiente.

---

## 📁 Estrutura do Projeto

├── app/
│ ├── frases.js
│ ├── gifs.js
│ ├── giphy.js
│ ├── slack.js
│ └── main.js
├── .env
├── package.json
└── README.md


---

## ⚙️ Pré-requisitos

- Node.js 18 ou superior
- Conta no Slack com permissão para criar Apps
- Conta no Giphy Developers para gerar uma API Key
- Planilha pública do Google Sheets com colunas: `nome`, `email`, `nascimento`

---

## 🔐 Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

SLACK_TOKEN=your-slack-bot-token
SLACK_CHANNEL=nome-do-canal-sem-cerquilha
SHEET_URL=https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
GIPHY_API_KEY=your-giphy-api-key


---

## 📄 Formato da Planilha

| nome           | email                      | nascimento   |
|----------------|----------------------------|--------------|
| João da Silva  | joao.silva@empresa.com.br  | 01/04/1990   |
| Maria Souza    | maria@empresa.com.br       | 26/06/1985   |

**Importante:**  
Publique a planilha no formato CSV:  
`Arquivo > Compartilhar > Publicar na Web > Como CSV`

---

## ▶️ Como Executar

1. Instale as dependências: npm install


2. Execute manualmente: node app/index.js


> Para agendar automaticamente, utilize `node-cron`, `PM2`, ou um serviço de agendamento (ex: GitHub Actions, Heroku Scheduler, etc).

---

## 📤 Permissões Necessárias no Slack App

No app criado em https://api.slack.com/apps, adicione os seguintes *OAuth Scopes*:

- `chat:write`
- `users:read`
- `users:read.email`

---

## 🎉 Funcionamento

- O bot verifica a planilha diariamente.
- Caso existam aniversariantes:
  - Gera frases personalizadas com o nome.
  - Adiciona um GIF temático de aniversário via Giphy.
  - Menciona o usuário do Slack (caso o e-mail bata).
  - Cada aniversariante recebe sua própria frase e seu próprio GIF.

---

## 👨‍💻 Autor

Projeto desenvolvido por **Allan Barbosa** para promover cultura, reconhecimento e engajamento da equipe no Slack.


