// routes/userRoutes.js
import express from 'express';
import { getProfile } from '../controllers/UserController.js';
import { checkAuth, authorizeRoles } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/me', checkAuth, getProfile);

// Admin-only route
router.get('/admin/dashboard', checkAuth, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

// Warden-only route
router.get('/warden/rooms', checkAuth, authorizeRoles('warden'), (req, res) => {
  res.json({ message: 'Warden Room Management Area' });
});

export default router;
