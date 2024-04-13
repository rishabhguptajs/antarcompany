import express from 'express';
import { verifySeller } from '../middlewares/authMiddleware.js';
import { verifyBank } from '../middlewares/verifyMiddleware.js';
import { sellerProductAddController, sellerProductDeleteController, sellerProductUpdateController, sellerProductViewController } from '../controllers/sellerController.js';

const router = express.Router();

router.post('/add', verifySeller, verifyBank, sellerProductAddController);
router.get('/view/:id', verifySeller, verifyBank, sellerProductViewController);
router.put('/update/:id', verifySeller, verifyBank, sellerProductUpdateController);
router.delete('/delete/:id', verifySeller, verifyBank, sellerProductDeleteController);

export default router;