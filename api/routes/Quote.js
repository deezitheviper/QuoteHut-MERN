import express from 'express';
import { addComment, addQuote,deleteQuote,getQuote, getQuotes, saveQuote } from '../controllers/quoteController.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { verifyUser } from '../middlewares/verify.js';

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
router.post('/create/:id',verifyUser, addQuote)
router.post('/:id/comment',verifyUser, addComment)
router.get('/:id', getQuote)
router.post('/save/:id/:userId', saveQuote)
router.delete('/:id', deleteQuote)

export default router;