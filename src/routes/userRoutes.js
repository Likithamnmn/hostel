import express from 'express';
import { 
  getProfile, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/UserController.js';

import { 
  createHostel, 
  getAllHostels, 
  getHostelById 
} from '../controllers/HostelController.js';

import { checkAuth, authorizeRoles } from '../middleware/authMiddleware.js';
import { isGender } from '../middleware/isGender.js';
import accessControl from '../middleware/accessControl.js'; // ✅ default import

const router = express.Router();

// Profile
router.get('/me', checkAuth, getProfile);

// Admin dashboard
router.get('/admin/dashboard', checkAuth, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

// Warden dashboard
router.get('/warden/rooms', checkAuth, authorizeRoles('warden'), (req, res) => {
  res.json({ message: 'Warden Room Management Area' });
});

// Gender-based zones
router.get('/student-zone', checkAuth, isGender('male', 'female'), (req, res) => {
  res.send('Welcome Student');
});

router.get('/boys-hostel', checkAuth, isGender('male'), (req, res) => {
  res.send('Welcome to Boys Hostel');
});

router.get('/female-zone', checkAuth, isGender('female'), (req, res) => {
  res.send('Welcome Female User');
});

// ---------- USER MANAGEMENT (Admin only) ----------
router.get('/users', checkAuth, accessControl(['admin']), getAllUsers);
router.get('/users/:id', checkAuth, accessControl(['admin']), getUserById);
router.put('/users/:id', checkAuth, accessControl(['admin']), updateUser);
router.delete('/users/:id', checkAuth, accessControl(['admin']), deleteUser);

// ---------- HOSTEL MANAGEMENT (Admin only) ----------
router.post('/hostels', checkAuth, accessControl(['admin']), createHostel);
router.get('/hostels', checkAuth, getAllHostels);
router.get('/hostels/:id', checkAuth, getHostelById);

export default router;
