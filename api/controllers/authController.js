import User from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import {createErr} from '../middlewares/error.js';
import axios from 'axios';

export const authController = async (req, res, next) => {
    const {access_token} = req.body;
    await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${access_token}` },
              }).then(response => {
    const {name, picture,email, email_verified, sub} = response.data;
    const getUsername = (email) => email.split(/@(?=[^@]*$)/)[0];
    if(email_verified){
        User.findOne({email}).exec((err, user) => {
            if(user){

            const token = jwt.sign({id:user.userId,role:user.role}, process.env.SECRET_KEY,{
                expiresIn: '2d'
            })
            const {name,username, picture} = user;
            res.cookie("accesstoken", token, {
                httpOnly: true,
            }).status(200).json({
                user:{
                    name,
                    username,
                    picture,
                    email,
                    role
                }
        })
    }else{
         user = new User({
            name,
            username:getUsername(email),
            picture,
            email,
            userId:sub
        })
         user.save((err, user) => {
            if(user){ 
            const token = jwt.sign({id:user.userId,role:user.role}, process.env.SECRET_KEY,{
                expiresIn: '2d'
            })
            const {name,username, email,role, picture} = user;
            res.cookie("accesstoken", token, {
                httpOnly: true,
            }).status(200).json({
                user:{
                    name,
                    email,
                    username,
                    picture,
                    role
                }
        })
    }
    next(err)
         })
    }

    })}else{
        next(createErr(400,"Google Login Error"));
    } 

}).catch(err => next(err))
}
