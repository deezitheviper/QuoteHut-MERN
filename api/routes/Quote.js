import express from 'express';
import { addComment, addQuote,deleteComment,deleteQuote,getCatQuotes,getQuote, getQuotes, saveQuote, searchQ } from '../controllers/quoteController.js';
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
router.get('/search', searchQ)
router.get('/category', getCatQuotes)
router.post('/create/:id',verifyUser, addQuote)
router.post('/:id/comment',verifyUser, addComment)
router.get('/:id', getQuote)
router.post('/save/:id/:userId',verifyUser, saveQuote)
router.delete('/:id',verifyUser, deleteQuote)
router.delete('/:id/comment',verifyUser, deleteComment)

export default router;