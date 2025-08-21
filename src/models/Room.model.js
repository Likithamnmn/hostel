import mongoose from "mongoose";
import Hostel from "./hostel.model.js";
import User from "./user.model.js";

const roomSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true },
    hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
    students: [
      {
        type: String, // store USNs, not ObjectIds
    ref: "User",
      },
    ],
    filled: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ✅ Virtual field
roomSchema.virtual("availableBeds").get(function () {
  return this.capacity - this.filled;
});

// ✅ Pre-save: enforce capacity + sync filled
roomSchema.pre("save", function (next) {
  if (this.students.length > this.capacity) {
    return next(new Error("Room capacity exceeded: too many students assigned"));
  }
  this.filled = this.students.length;
  next();
});

// ✅ After save: sync Hostel + Users
roomSchema.post("save", async function (doc, next) {
  try {
    await Hostel.findByIdAndUpdate(doc.hostel, {
      $addToSet: { rooms: doc._id },
    });

    if (doc.students?.length > 0) {
      await User.updateMany(
        {  usn: { $in: doc.students } },
  { $set: { room: doc._id } }
      );
    }

    next();
  } catch (err) {
    next(err);
  }
});

// ✅ When deleted: cleanup hostel + users
roomSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    if (doc) {
      await Hostel.findByIdAndUpdate(doc.hostel, {
        $pull: { rooms: doc._id },
      });

      if (doc.students?.length > 0) {
        await User.updateMany(
          { _id: { $in: doc.students } },
          { $unset: { room: "" } }
        );
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

// ✅ Default export (fixes your import issue)
export default Room;
