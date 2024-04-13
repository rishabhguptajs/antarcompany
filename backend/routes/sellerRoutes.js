import express from 'express';
import { sellerBankUpdateController, sellerLoginController, sellerProductAddController, sellerProfileController, sellerProfileUpdateController, sellerRegisterController } from '../controllers/sellerController.js';
import { verifySeller } from '../middlewares/authMiddleware.js';
import { verifyBank } from '../middlewares/verifyMiddleware.js';

const router = express.Router();

// seller routes
router.post('/register', sellerRegisterController);
router.post('/login', sellerLoginController);
router.get('/profile', verifySeller, sellerProfileController);
router.put('/profile/update', verifySeller, sellerProfileUpdateController);

// seller bank details routes
router.put('/profile/bank/update', verifySeller, sellerBankUpdateController);

// product routes


export default router;