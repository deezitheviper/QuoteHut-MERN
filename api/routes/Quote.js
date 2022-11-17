import express from 'express';
import { addQuote,deleteQuote,getQuote, getQuotes } from '../controllers/quoteController.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET, 
  }); 

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "Dev",
      allowedFormats: ['jpg','jpeg','png']
    },
  })


const upload = multer()
const router = express.Router();

router.get('/', getQuotes)
router.post('/create', addQuote)
router.get('/:id', getQuote)
router.delete('/:id', deleteQuote)

export default router;