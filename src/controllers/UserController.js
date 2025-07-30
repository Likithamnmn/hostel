import User from '../models/User.js';
import { hashPassword } from '../utils/hashPassword.js';

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
