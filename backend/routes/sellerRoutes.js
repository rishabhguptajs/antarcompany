import express from 'express';
import { sellerLoginController, sellerProfileController, sellerRegisterController } from '../controllers/sellerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', sellerRegisterController);
router.post('/login', sellerLoginController);
router.get('/profile', verifyToken, sellerProfileController);

export default router;