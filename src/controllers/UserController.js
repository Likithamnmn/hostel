import User from '../models/User.model.js';
import { hashPassword } from '../utils/hashPassword.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, username, gender, role, password } = req.body;

    // Basic validation
    if (!name || !username || !gender || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password too weak. Must be at least 8 characters.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken.' });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create new user
    const user = new User({
      name,
      username,
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

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' }
      );
       const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );


      res.json({ token }
    );

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { login };

export const getProfile = async (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}`,userId: req.user.id,
    role: req.user.role, });
};

export const approveStudentController = async (req, res) => {
  try {
    const { studentId } = req.body;

    // Example MongoDB update assuming students are in the User model with a role
    await User.findByIdAndUpdate(studentId, { isApproved: true });

    res.status(200).json({ message: 'Student approved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve student' });
  }
};

