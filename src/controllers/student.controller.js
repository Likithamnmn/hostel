import StudentRequest from "../models/StudentRequest.model.js";

// Student creates a request
export const createRequest = async (req, res) => {
  try {
    const { hostelId, roomType } = req.body;

    const request = await StudentRequest.create({
      student: req.user._id,
      hostel: hostelId,
      roomType,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit request",
      error: error.message,
    });
  }
};
