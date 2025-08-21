import express from 'express';
import { register, login,getProfile } from '../controllers/user.controller.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', checkAuth, getProfile);


export default router;
