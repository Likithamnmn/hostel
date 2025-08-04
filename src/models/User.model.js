import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    gender: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'warden', 'admin'],
      default: 'student',
    },
    password: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 🔥 Optional: Create indexes cleanly (use only after dropping old ones)
userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
