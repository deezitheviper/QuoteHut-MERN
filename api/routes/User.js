import express from 'express';
import { getSaveQ, getUser, getUserQ } from '../controllers/userController.js';
const router = express.Router();

router.get('/:userId', getUser)
router.get('/:userId/quotes', getUserQ)
router.get('/:userId/saved', getSaveQ)

export default router;