import express from "express";
import {
  getProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import {
  createHostel,
  getAllHostels,
  getHostelById,
} from "../controllers/hostel.controller.js";

import {
  verifyPayment,
  forwardRequest,
} from "../controllers/admin.controller.js";

import {
  approveRequest,
  rejectRequest,
} from "../controllers/warden.controller.js";

import { protect, authorize } from "../middleware/authMiddleware.js"; // ✅ fixed
import { isGender } from "../middleware/isGender.js";
import accessControl from "../middleware/accessControl.js"; // ✅ custom middleware
import { createRequest } from "../controllers/student.controller.js";
// ✅ added

const router = express.Router();

// ---------- PROFILE ----------
router.get("/me", protect, getProfile);

// ---------- ADMIN DASHBOARD ----------
router.get(
  "/admin/dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard" });
  }
);

// ---------- WARDEN DASHBOARD ----------
router.get(
  "/warden/rooms",
  protect,
  authorize("warden"),
  (req, res) => {
    res.json({ message: "Warden Room Management Area" });
  }
);

// ---------- GENDER-BASED ZONES ----------
router.get("/student-zone", protect, isGender("male", "female"), (req, res) => {
  res.send("Welcome Student");
});

router.get("/boys-hostel", protect, isGender("male"), (req, res) => {
  res.send("Welcome to Boys Hostel");
});

router.get("/female-zone", protect, isGender("female"), (req, res) => {
  res.send("Welcome Female User");
});

// ---------- USER MANAGEMENT (Admin only) ----------
router.get("/users", protect, accessControl(["admin"]), getAllUsers);
router.get("/users/:id", protect, accessControl(["admin"]), getUserById);
router.put("/users/:id", protect, accessControl(["admin"]), updateUser);
router.delete("/users/:id", protect, accessControl(["admin"]), deleteUser);

// ---------- HOSTEL MANAGEMENT (Admin only) ----------
router.post("/hostels", protect, accessControl(["admin"]), createHostel);
router.get("/hostels", protect, getAllHostels);
router.get("/hostels/:id", protect, getHostelById);

// ---------- ADMIN ACTIONS ----------
router.patch("/:id/verify", protect, authorize("admin"), verifyPayment);
router.patch("/:id/forward", protect, authorize("admin"), forwardRequest);

// ---------- WARDEN ACTIONS ----------
router.patch("/:id/approve", protect, authorize("warden"), approveRequest);
router.patch("/:id/reject", protect, authorize("warden"), rejectRequest);

// ---------- STUDENT ACTION ----------
router.post("/requests", protect, authorize("student"), createRequest);

export default router;
