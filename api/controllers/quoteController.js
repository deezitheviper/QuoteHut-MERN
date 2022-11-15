import mongoose from "mongoose";
import quote from "../models/quote.js";

export const getQuotes = async (req, res, next) => {
    const quotes =  await quote.find()
    .catch( err => next(err))
    res.status(200).json(quotes)
}
