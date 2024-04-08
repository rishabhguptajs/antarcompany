import express from 'express'
import { categoryCreateController } from '../controllers/categoryController.js';

const router = express.Router()

router.post('/new', categoryCreateController);


export default router;