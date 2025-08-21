// routes/wardenRoutes.js
import express from 'express';
import { checkAuth} from '../middleware/authMiddleware.js';
import { accessControl } from '../middleware/accessControl.js';
import { createUser } from '../controllers/wardenController.js';


router.post(
  '/create-user',
  checkAuth,
  accessControl(['warden']),
  createUser
);

export default router;