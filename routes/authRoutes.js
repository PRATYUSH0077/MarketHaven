import express from 'express'
import { loginController, registerController, testController } from '../controllers/authController.js'
import { RequireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import userModel from '../models/userModel.js';
// router object 
const router = express.Router();

// routing to be performed here
// REGISTER ROUTE
router.post('/register', registerController);
router.post('/login', loginController)
router.get('/test', RequireSignIn, isAdmin, testController);

// Authenticating user
router.get('/user-auth', RequireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router;
