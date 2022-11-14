import User from '../models/authModel.js';
import jwt from 'jsonwebtoken';


export const authController = async (req, res, next) => {
    const {access_token} = req.body;
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${access_token}` },
              }).then(res => {
    const {name, picture, email_verified, sub} = res.data;
    if(email_verified){
        User.findOne({email}).exec((err, user) => {
            if(user){

            const token = jwt.sign({id:user.userId,role:user.role}, process.env.SECRET_KEY,{
                expiresIn: '2d'
            })
            const {name,userId, email, picture} = user;
            res.cookie("accesstoken", token, {
                httpOnly: true,
            }).status(200).json({
                user:{
                    name,
                    email,
                    picture,
                    userId,
                }
        })
    }else{
        const user = new User({
            name,
            picture,
            email_verified,
            userId:sub
        })
         user.save((err, user) => {
            if(err) { 
                next(err)
            }
            const token = jwt.sign({id:user.userId,role:user.role}, process.env.SECRET_KEY,{
                expiresIn: '2d'
            })
            const {name,userId, email, picture} = user;
            res.cookie("accesstoken", token, {
                httpOnly: true,
            }).status(200).json({
                user:{
                    name,
                    email,
                    picture,
                    userId,
                }
        })
         })
    }

    })}else{
        next(CreateErr(400,"Google Login Error"));
    } 

})
}
