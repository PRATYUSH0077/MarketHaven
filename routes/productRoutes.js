import express from 'express'
import { RequireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategaryController } from '../controllers/productController.js';
const router = express.Router();

//CREATE PRODUCT
router.post('/create-product', RequireSignIn, isAdmin, formidable(), createProductController);

//FETCH ALL PRODUCT
router.get('/get-product', getProductController);

//FETCH SINGLE PRODUCT
router.get('/get-product/:slug', getSingleProductController);

//FETCH PHOTO PRODUCT
router.get('/photo/:pid', productPhotoController);

//DLETE PRODUCT
router.delete('/delete-product/:pid', RequireSignIn, isAdmin, deleteProductController);

//UPDATE PRODUCT
router.put('/update-product/:pid', RequireSignIn, isAdmin, formidable(), updateProductController);

// FILTER PRODUCT
router.post('/product-filters', productFilterController);

// PRODUCT COUNT
router.get('/product-count', productCountController);

//PRODUCT PER PAGE
router.get('/product-per-page/:page', productListController);

// SEARCH PRODUCT CONTROLLER
router.get('/product-search/:keyword', searchProductController);

//SIMILAR PRODUCT CONTROLLER
router.get('/similar-product/:pid/:cid', relatedProductController)

// CATEPGARY WISE PRODUCT
router.get('/product-category/:slug', productCategaryController)


export default router;