import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      default: 1,
    },
    occupants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // link to students/users
      },
    ],
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel", // link to parent hostel
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "full", "maintenance"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
