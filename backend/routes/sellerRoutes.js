import express from 'express';
import { sellerLoginController, sellerProductAddController, sellerProfileController, sellerProfileUpdateController, sellerRegisterController } from '../controllers/sellerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', sellerRegisterController);
router.post('/login', sellerLoginController);
router.get('/profile', verifyToken, sellerProfileController);
router.put('/profile/update', verifyToken, sellerProfileUpdateController);
router.post('/product/add', verifyToken, sellerProductAddController);

export default router;