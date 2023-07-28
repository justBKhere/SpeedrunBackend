// src/routes/userRoutes.ts
import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Register a new user
router.post('/register', UserController.register);




export default router;
