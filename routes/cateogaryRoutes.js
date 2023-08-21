import express from 'express';
import { isAdmin, RequireSignIn } from '../middlewares/authMiddleware.js'
import { createCateogaryController, deleteController, getAllCateogaryController, singleCateogaryController, updateCateogaryController } from '../controllers/cateogaryController.js';

const router = express.Router();

// routes
router.post('/create-cateogary', RequireSignIn, isAdmin, createCateogaryController);

router.put('/update-cateogary/:id', RequireSignIn, isAdmin, updateCateogaryController)

// GETTING THE CATEOGARY
router.get('/getAllCateogary', getAllCateogaryController);
router.get('/getOneCateogary/:slug', singleCateogaryController);

// DELETING A CATEOGARY
router.delete('/deleteCateogary/:id', RequireSignIn, isAdmin, deleteController);


export default router;