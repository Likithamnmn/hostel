import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Room from "../models/Room.model.js";

// ======================= REGISTER =======================
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      approved: role === "warden", // auto approve warden
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

// ======================= LOGIN =======================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

// ======================= APPROVE STUDENT =======================
export const approveStudentController = async (req, res) => {
  try {
    const { studentId, roomNumber } = req.body;

    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    if (student.role !== "student")
      return res.status(400).json({ error: "Only students can be approved" });

    // Assign a room if provided
    let room = null;
    if (roomNumber) {
      room = await Room.findOne({ roomNumber });
      if (!room) return res.status(404).json({ error: "Room not found" });
      student.room = room._id;
    }

    student.approved = true;
    await student.save();

    res.status(200).json({
      message: "Student approved successfully",
      student,
    });
  } catch (error) {
    console.error("Approve Student Error:", error);
    res.status(500).json({ error: "Failed to approve student" });
  }
};

// ======================= GET ALL USERS =======================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("room", "roomNumber");

    res.status(200).json({ users });
  } catch (error) {
    console.error("GetAllUsers Error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// ======================= GET PROFILE =======================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").populate("room", "roomNumber");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("GetProfile Error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// ======================= GET USER BY ID =======================
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password").populate("room", "roomNumber");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("GetUserById Error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// ======================= UPDATE USER =======================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      return res.status(400).json({ error: "Password cannot be updated here" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true, select: "-password" }
    ).populate("room", "roomNumber");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("UpdateUser Error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// ======================= DELETE USER =======================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("DeleteUser Error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
