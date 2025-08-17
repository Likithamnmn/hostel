import mongoose from "mongoose";

const studentRequestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔗 links to User model
      required: true,
    },
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel", // 🔗 links to Hostel model
      required: true,
    },
    roomType: {
      type: String,
      enum: ["single", "double", "triple", "dormitory"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "forwarded", "approved", "rejected"],
      default: "pending",
    },
    notes: {
      type: String, // optional remarks
    },
  },
  { timestamps: true }
);

const StudentRequest = mongoose.model("StudentRequest", studentRequestSchema);

export default StudentRequest;
