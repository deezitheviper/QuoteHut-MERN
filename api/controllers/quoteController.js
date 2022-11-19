import mongoose from "mongoose";
import quote from "../models/quote.js";
import cloudinary from "../utils/cloudinary.js";






export const getQuotes = async (req, res, next) => {
    const quotes =  await quote.find().sort({createdAt: 'desc'})
    .populate({
        path:'postedBy',select:['username','picture','_id']
    })
    .catch( err => next(err))
    res.status(200).json(quotes)   
}

export const getQuote = async (req, res, next) => {
    
        const {id} = req.params
        const quoteD = await quote.findById(id).populate({
            path:'postedBy',select:['username','picture','_id']
        })
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


export const addQuote = async (req, res, next) => {
   
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
    try {
    const quote = await quote.findById(id)
    await cloudinary.uploader.delete(quote.cloudinary_id);
    await quote.remove()
    res.status(200).json("Quote deleted")
    }catch(err){
        next(err)
    }  
}