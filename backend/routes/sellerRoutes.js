import express from 'express';
import { sellerLoginController, sellerProductAddController, sellerProfileController, sellerProfileUpdateController, sellerRegisterController } from '../controllers/sellerController.js';
import { verifySeller } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', sellerRegisterController);
router.post('/login', sellerLoginController);
router.get('/profile', verifySeller, sellerProfileController);
router.put('/profile/update', verifySeller, sellerProfileUpdateController);
router.post('/product/add', verifySeller, sellerProductAddController);

export default router;