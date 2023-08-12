import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

//Protected routes baesed on tokens

export const RequireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        console.log('error in RequireSignIn', err);
    }
}


// ADMIN ACCESS BASED ON ROLE
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            res.status(200).send({
                success: false,
                message: 'UnAuthorized Access'
            })
        } else {
            res.status(200).send({
                success: true,
                message: 'Access granted'
            })
            next();
        }
    } catch (err) {
        res.status(404).send({ message: 'Error in isAdmin Function' });
        console.log(err);
    }
}