import userModel from '../models/userModel.js'
import { hashPassword, comparePassword } from '../utils/authUtil.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // validating if all field present
        if (!name || !email || !password || !phone || !address)
            return res.send({ message: 'ALL FIELDS ARE REQUIRED' });

        // checking for pre exiting user
        const user_present = await userModel.findOne({ email: email });

        if (user_present) {
            return res.status(200).send({
                success: false,
                message: 'Already registered , please Proceed to Login'
            })
        }


        // creating new user
        const hashedpassword = await hashPassword(password)
        // save
        const user = await new userModel({ name, email, phone, address, password: hashedpassword }).save();
        res.status(201).send({
            success: true,
            message: 'Successfully Registered, proceed to Login',
            user
        })


    } catch (err) {
        console.log('Error in authController.js : ', err);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            err
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                error: 'ALL FIELDS ARE REQUIRED'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                error: 'User not found, check credentials'
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                error: 'Incorrect Password'
            })
        }
        // TOKEN
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.status(200).send({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        })

    } catch (err) {
        console.log('Error in loginController.js : ', err);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            err
        })
    }
}


export const testController = (req, res) => {
    try {
        // res.send('protected routes called');
        console.log('protected routes');
    } catch (err) {
        console.log(err);
        res.send({ err });
    }
}