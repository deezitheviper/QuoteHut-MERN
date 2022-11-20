import User from '../models/authModel.js'
import quote from '../models/quote.js'


export const getUser = async (req, res, next) =>{
       const {userId} = req.params
       try {
       
        const user = await User.findById(userId)
        res.status(200).json(user)
       }catch(err) {
        console.error(err)
       }
}

export const getUserQ = async (req,res,next) =>{
       const {userId} = req.params
       try{
              const quotes = await quote.find({postedBy:userId})
              res.status(200).json(quotes)
       }catch(err) {
              console.log(err)
       }
}

export const getSaveQ = async (req,res,next) => {
       const {userId} = req.params
       try {
              const quotes = await quote.find({savedBy:userId})
              res.status(200).json(quotes)
       }catch(err) {
              console.log(err)
       }
}