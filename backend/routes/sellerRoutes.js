import express from 'express';
import { sellerLoginController, sellerRegisterController } from '../controllers/sellerController.js';

const router = express.Router();

router.post('/register', sellerRegisterController);
router.post('/login', sellerLoginController);

export default router;