import User from '../models/User.model.js';
import { hashPassword } from '../utils/hashPassword.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  console.log("🚀 Incoming payload:", req.body);
  try {
    const { name, email, gender, role, password } = req.body;

    // Validation
    if (!name || !email || !gender || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password too weak. Must be at least 8 characters.' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const hashed = await hashPassword(password);

    const user = new User({
      name,
      email,
      gender,
      role: role || 'Student',
      password: hashed,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { login };

export const getProfile = async (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}`,
    userId: req.user.id,
    role: req.user.role,
  });
};

export const approveStudentController = async (req, res) => {
  try {
    const { studentId } = req.body;

    await User.findByIdAndUpdate(studentId, { isApproved: true });

    res.status(200).json({ message: 'Student approved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve student' });
  }
};


// @desc    Get all users
// @route   GET /api/users
// @access  Admin only
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Admin only
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};
// @desc    Update a user (Admin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updates = req.body; // { name, role, gender, etc. }
    Object.assign(user, updates);
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


