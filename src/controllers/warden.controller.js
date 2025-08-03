import User from '../models/User.model.js';
import { hashPassword } from '../utils/hashPassword.js';

//Create a new user account (student or admin). Only Wardens can do this.
//The request body will contain the new user's details.
export const createUser = async (req, res) => {
    try {
        const { name, email, password, gender, role } = req.body;

        // basic validation
        if (!name || !email || !password || !gender || !role) {
            return res.status(400).json({ error: 'All fields are required: name, email, password, gender, role.' });
        }

        // only valid roles can be created
        if (!['student', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role specified. Can only create "student" or "admin".' });
        }

        // fheck if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'A user with this email already exists.' });
        }

        //hashing
        const hashedPassword = await hashPassword(password);

        // create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gender,
            role,
            accountStatus: 'active', // Warden creates accounts as 'active' directly
        });

        await newUser.save();

        res.status(201).json({
            message: `${role} account created successfully for ${name}.`,
            userId: newUser._id
        });

    } catch (error) {
        console.error('Create User Error:', error);
        res.status(500).json({ error: 'Server error while creating user.' });
    }
};
