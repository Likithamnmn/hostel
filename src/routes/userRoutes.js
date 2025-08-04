// routes/userRoutes.js
import express from 'express';
import { getProfile } from '../controllers/UserController.js';
import { checkAuth, authorizeRoles } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { isGender } from '../middleware/isGender.js';

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
router.get('/student-zone', checkAuth, isGender('male', 'female'), (req, res) => {
  res.send('Welcome Student');
});

// Only males
router.get('/boys-hostel', checkAuth, isGender('male'), (req, res) => {
  res.send('Welcome to Boys Hostel');
});
router.get('/female-zone',checkAuth, isGender('female'), (req, res) => {
  res.send('Welcome Female User');
});
export default router;
