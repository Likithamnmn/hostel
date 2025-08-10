import express from 'express';
import { getProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.Controller.js';
import { checkAuth, authorizeRoles } from '../middleware/authMiddleware.js';
import { isAdminOrWarden } from '../middleware/isAdmin.js';
import { isGender } from '../middleware/isGender.js';

const router = express.Router();

router.get('/me', checkAuth, getProfile);

router.get('/admin/dashboard', checkAuth, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

router.get('/warden/rooms', checkAuth, authorizeRoles('warden'), (req, res) => {
  res.json({ message: 'Warden Room Management Area' });
});

router.get('/student-zone', checkAuth, isGender('male', 'female'), (req, res) => {
  res.send('Welcome Student');
});

router.get('/', checkAuth, authorizeRoles('admin'), getAllUsers);

router.get('/:id', checkAuth, authorizeRoles('admin'), getUserById);

router.put('/:id', checkAuth, isAdminOrWarden, updateUser);

router.delete('/:id', checkAuth, isAdminOrWarden, deleteUser);

export default router;
