import mongoose from "mongoose";
import quote from "../models/quote.js";
import cloudinary from "../utils/cloudinary.js";






export const getQuotes = async (req, res, next) => {
    const quotes =  await quote.find()
    .catch( err => next(err))
    res.status(200).json(quotes)   
}

export const getQuote = async (req, res, next) => {
    
        const {id} = req.params
        const quote = await quote.findOne({_id: id})
        .catch(err => next(err))
        res.status(200).json(quote)
}

export const addQuote = async (req, res, next) => {
    const {inputs} = req.body;
    try {
      const newQuote = new quote(req.body)
      await newQuote.save() 
      res.status(200).json(newQuote)
    }catch(err){ 
        //console.log(err)
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