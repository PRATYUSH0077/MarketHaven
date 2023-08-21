import express from 'express'
import { RequireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js';
const router = express.Router();

router.post('/create-product', RequireSignIn, isAdmin, formidable(), createProductController);
router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController);
router.get('/photo/:pid', productPhotoController);
router.delete('/delete-product/:pid', RequireSignIn, isAdmin, deleteProductController);
router.put('/update-product/:pid', RequireSignIn, isAdmin, formidable(), updateProductController);


export default router;