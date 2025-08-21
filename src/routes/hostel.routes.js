import express from 'express';
import {
  createHostel,
  getAllHostels,
  getHostelById
} from '../controllers/hostel.controller.js';
import { checkAuth, authorize } from '../middleware/authMiddleware.js';
import { isGender } from '../middleware/isGender.js';

const router = express.Router();

router.get('/boys-hostel', checkAuth, isGender('male'), (req, res) => {
  res.send('Welcome to Boys Hostel');
});

router.get('/girls-hostel', checkAuth, isGender('female'), (req, res) => {
  res.send('Welcome Female User');
});

/**
 * @route   POST /api/hostels
 * @desc    Create a new hostel
 * @access  Admin only
 */
router.post('/', checkAuth, authorize('admin'), createHostel);

/**
 * @route   GET /api/hostels
 * @desc    Get all hostels
 * @access  Authenticated users
 */
router.get('/', checkAuth, getAllHostels);

/**
 * @route   GET /api/hostels/:id
 * @desc    Get hostel by ID
 * @access  Authenticated users
 */
router.get('/:id', checkAuth, getHostelById);

export default router;
