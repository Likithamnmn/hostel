import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    usn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true, // standardize USN storage
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    // Instead of ObjectId, we store USN in Room.students array
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },

    role: {
      type: String,
      enum: ["student", "warden", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

// Make queries always lean on USN
userSchema.index({ usn: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
