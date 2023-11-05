import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { SERVER_PORT } from './config/env.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
import routes from './routes/index.js';
app.use('/api/v2', routes);

const PORT = SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`[server] Server is running at PORT: ${PORT}`);
});
