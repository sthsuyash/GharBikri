import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import { SERVER_PORT } from './config/env.js';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    origin: ['http://localhost:5000', 'http://localhost:5001']
}));

// Routes
app.use('/api/v2', routes);

// Swagger
import swaggerDocument from '../docs/swagger.json' assert { type: "json" };
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`[server] Server is running at PORT: ${PORT}`);
});
