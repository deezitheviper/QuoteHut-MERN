import mongoose from "mongoose";
import quote from "../models/quote.js";
import cloudinary from "../utils/cloudinary.js";
import Comment from "../models/comment.js";





export const getQuotes = async (req, res, next) => {
    const quotes =  await quote.find().sort({createdAt: 'desc'})
    .populate({
        path:'postedBy',select:['username','picture','_id']
    })
    .catch( err => next(err))
    res.status(200).json(quotes)   
}


export const getCatQuotes = async (req, res, next) => {
    const {cat} = req.query;
    const quotes =  await quote.find({category:cat}).sort({createdAt: 'desc'})
    .populate({
        path:'postedBy',select:['username','picture','_id']
    })
    .catch( err => next(err))
    res.status(200).json(quotes)   
}

export const searchQ = async (req, res, next) => {
    const {q} = req.query
    const quotes = await quote.find({
        $or: [
            {title: {$regex: q, $options: 'i'}},
            {about: {$regex: q, $options: 'i'}},]
}).sort({createdAt: 'desc'})
.populate({
    path:'postedBy',select:['username','picture','_id']
})
.catch(err => console.log(err))
res.status(200).json(quotes)   

}


export const getQuote = async (req, res, next) => {
    
        const {id} = req.params
        const quoteD = await quote.findById(id).populate({
            path:'postedBy',select:['username','picture','_id']
        }).populate({path: 'comments', populate:{'path': 'postedBy',model:'user'}})
        .catch(err => next(err))
        res.status(200).json(quoteD)
}




export const saveQuote = async (req, res, next) => {
    const {id, userId} = req.params
    const Quote = await quote.findById(id)
    const index =  Quote.savedBy.findIndex(id => id !== String(userId))
    if(index === -1){
        Quote.savedBy.push(userId)
    }else {
        Quote.savedBy = Quote.savedBy.filter(id => id === String(userId))

    }
    await quote.findByIdAndUpdate(id, Quote,{new:true})
    .catch(err => console.log(err))
    res.status(200).json("Quote Saved")
}

export const addComment = async (req, res, next) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Quote not found")
    try{ 
    const Quote = await quote.findById(id)
    const newcomment = new Comment(req.body)
    Quote.comments.push(newcomment)
    await quote.findByIdAndUpdate(id,Quote,{new:true})
    await newcomment.save()
    res.status(200).json("Comment Added")
    }catch(err){ console.log(err)}
    
}


export const addQuote = async (req, res, next) => {
   const {id} = req.params;
    try {
      const newQuote = new quote(req.body)
      await newQuote.save() 
      res.status(200).json(newQuote)
    }catch(err){ 
        next(err) 
    }  
}

export const deleteQuote = async (req, res, next) => {
    const {id} = req.params;
    await quote.findByIdAndDelete(id)
    .catch(err => next(err));
    res.status(200).json("Quote Deleted")
} 

export const deleteComment = async (req, res, next) => {
    const {id} = req.params;
    await Comment.findByIdAndDelete(id)
    .catch(err => next(err));
    res.status(200).json("Comment Deleted")
}