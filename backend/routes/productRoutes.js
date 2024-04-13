import express from 'express';
import { verifySeller } from '../middlewares/authMiddleware.js';
import { verifyBank } from '../middlewares/verifyMiddleware.js';
import { sellerProductAddController } from '../controllers/sellerController.js';

const router = express.Router();

router.post('/add', verifySeller, verifyBank, sellerProductAddController);

export default router;