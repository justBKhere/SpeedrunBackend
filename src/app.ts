// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import userApiRouter from './routes/userRoutes';
import authMiddleware from './middleware/authMiddleware';

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Logging middleware with Morgan
app.use(morgan('combined'));

// API routes
app.use('/api/v1/user/', userApiRouter);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
export default app