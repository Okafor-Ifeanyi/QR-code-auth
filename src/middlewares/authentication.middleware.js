import { verifyToken, decodeToken } from '../configs/jwt.config.js';
import { userModel } from '../models/user.model.js';

const isAuth = async (req, res, next) => {
    let token = req.params.token;
    try {
        if( !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(403).json({message: 'Invalid token, Unauthorized user'})
        }

        token = req.headers.authorization.split(' ')[1]

        const { expired } = verifyToken(token);
    
        if (expired) {
            return res.status(403).json({message: 'Expired token, Unauthorized user'})
        } 
        // req.user = { _id: decode?._id }
        req.user = decodeToken(token)
       
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })    
    }
};

const isAdmin = async (req, res, next) => {
    const _id = req.user
    try {
        const isAdmin = await userModel.findOne({ _id, role: "admin" })

        if (!isAdmin){ 
            return res.status(403).json({ success: false, message: "User is not an Admin" }) 
        }

        next()
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error
        })    
    }
}

export{ isAuth, isAdmin }