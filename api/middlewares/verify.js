import jwt from 'jsonwebtoken';
import { createErr } from './error.js';


export const verifyToken = (req,res,next) => {
    const token = req.cookies.accesstoken;
    if (!token) {
        return next(createErr(401, 'Unauthorized'));
    }
    jwt.verify(token,process.env.SECRET_KEY, (err, user) => {
        if(err) return next(createErr(403,'Token invalid'));
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {

    verifyToken(req, res,next, () => {
        if(req.user.id == req.params.id || req.user.role == 'admin') {
            next();
        }else{
            return next(createErr(403,"You're not authenticated"));
        }
    });
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req,res,() => {
        if(req.user.role == 'admin') {
            next();
        }else{
            return next(createErr(403,"You're not admin"));
        }
    })
}