# 👤 Desafio Técnico - Perfil de Usuário | Sync360.io

Projeto fullstack desenvolvido como parte da etapa prática do processo seletivo da Sync360.io.
O sistema permite exibir, editar e salvar dados de perfis de usuários em um banco de dados MySQL.
A aplicação foi construída com React + Tailwind CSS no frontend e Node.js + Express + MySQL no backend, com suporte a deploy online (Vercel + Railway) e ambiente de desenvolvimento local.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router DOM](https://reactrouter.com/)

### ⚙️ Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Railway](https://railway.app/) (banco online)

---

## 📦 Funcionalidades

- ✅ Visualização dos dados do usuário
- ✏️ Edição e salvamento de dados
- 🌐 Integração com banco MySQL online (via Railway)
- 📡 Backend com API REST em Node + Express
- 📱 Interface responsiva com Tailwind CSS
- 🎞️ Animações com Framer Motion

---

## 💻 Rodando o Projeto Localmente

### ✅ Pré-requisitos
- Node.js instalado
- MySQL rodando localmente (ou Docker, XAMPP, etc.)
- Banco de dados `usuario` criado localmente
- Editor de código (VS Code recomendado)

---

### 1. Clonar o Repositório

```bash
git clone https://github.com/ChavesSWDev/sync360-Primeira-Etapa.git
```

---

### 2. ⚙️ Configurar o Backend

- cd backend
- npm i
- caso não ter, criar um arquivo chamado .env na raiz da pasta backend
- atribuir os seguintes valores:
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=desafiosync360
- DB_NAME=sync360
- PORT=3001
- após isso, digitar npm run dev no terminal dentro da pasta backend

---

### 3. 🖥️ Configurar o Frontend

- abrir um novo terminal
- cd frontend
- npm i
- npm run dev

---

### 🌍 Deploy Online

- Frontend hospedado em:
- Backend conectado ao banco MySQL na [Railway](https://railway.com)

---

### 👨‍💻 Autor

- Desenvolvido por [ChavesSWDev](https://www.linkedin.com/in/chavesdev/) 🚀
- Desafio técnico para Sync360.io 💼
