import User from '../models/authModel.js'


export const getUser = async (req, res, next) =>{
       const {userId} = req.params
       try {
        const user = await User.findOne({userId})
        res.status(200).json(user)
       }catch(err) {
        console.error(err)
       }
}