import express from 'express'
import { forgotPasswordController, loginController, registerController, testController } from '../controllers/authController.js'
import { RequireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import userModel from '../models/userModel.js';
// router object 
const router = express.Router();

// routing to be performed here
// REGISTER ROUTE
router.post('/register', registerController);
router.post('/login', loginController)
router.post('/forgot-password', forgotPasswordController)
router.get('/test', RequireSignIn, isAdmin, testController);

// Authenticating user
router.get('/user-auth', RequireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// Admin Route
router.get('/admin-auth', RequireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router;
