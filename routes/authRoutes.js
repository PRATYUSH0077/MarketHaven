import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'

// router object 
const router = express.Router();

// routing to be performed here
// REGISTER ROUTE
router.post('/register', registerController);
router.post('/login', loginController)

export default router;
