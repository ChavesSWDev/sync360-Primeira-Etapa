import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3001;

const allowedOrigins = [
    'http://localhost:5173',
    'https://sync360-primeira-etapa.vercel.app' 
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: origem não permitida'));
    }
}));

app.use(express.json());
app.use('/usuario', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em: ${PORT}`);
});
