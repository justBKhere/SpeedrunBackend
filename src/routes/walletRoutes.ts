import express, { Router, Request, Response } from 'express';
import WalletController from '../controllers/walletController';
import authMiddleware from '../middleware/authMiddleware';

const router: Router = express.Router();