
import StudentRequest from "../models/StudentRequest.model.js";

// Admin creates or receives a student request (ex: payment or admission request)
export const createStudentRequest = async (req, res) => {
  try {
    const { studentId, type, details } = req.body;

    const newRequest = await StudentRequest.create({
      student: studentId,
      type,
      details,
      status: "pending",
      forwardedByAdmin: false,
    });

    res.status(201).json({ message: "Request created", request: newRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin forwards request to warden
export const forwardRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await StudentRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.forwardedByAdmin) {
      return res
        .status(400)
        .json({ message: "Request already forwarded to warden" });
    }

    request.forwardedByAdmin = true;
    await request.save();

    res.status(200).json({ message: "Request forwarded to warden", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin can view all student requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await StudentRequest.find().populate("student", "name email");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.payment = {
      amount: req.body.amount,
      verifiedBy: req.user._id,
      date: new Date()
    };
    request.status = "payment_verified";
    await request.save();

    res.json({ message: "Payment verified", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Forward request to Warden

