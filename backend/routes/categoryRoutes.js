import express from 'express'
import { categoryCreateController, categoryDeleteController, categoryUpdateController, categoryViewController } from '../controllers/categoryController.js';
import { verifyAdmin, verifySeller } from '../middlewares/authMiddleware.js';
import { lazy } from 'react';
import { logRoles } from '@testing-library/react';

const router = express.Router()

router.post('/new', verifyAdmin,categoryCreateController);
router.get('/get/:slug', verifySeller, categoryViewController);
router.put('/update/:slug', verifyAdmin, categoryUpdateController);
router.delete('/delete/:slug', verifyAdmin, categoryDeleteController);

export default router;