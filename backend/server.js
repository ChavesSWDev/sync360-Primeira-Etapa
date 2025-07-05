import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3001;

app.use(cors());
app.use(express.json());

// Usa as rotas definidas em userRoutes.js para caminho /usuario
app.use('/usuario', usuarioRoutes);

// Inicia servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: ${PORT}`);
});
