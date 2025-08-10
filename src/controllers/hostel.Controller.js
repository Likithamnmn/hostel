import Hostel from '../models/Hostel.model.js';

export const createHostel = async (req, res) => {
  try {
    const { name, type, capacity } = req.body;

    if (!name || !type || !capacity) {
      return res.status(400).json({ message: "Fields 'name', 'type', and 'capacity' are required" });
    }

    const hostel = await Hostel.create({ name, type, capacity });
    res.status(201).json({ message: "Hostel created successfully", hostel });

  } catch (error) {
    if (error.code === 11000) {
        return res.status(409).json({ message: "A hostel with this name already exists." });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ message: "Hostel not found" });
    res.json(hostel);
  } catch (error) {
    res.status(400).json({ message: "Invalid hostel ID" });
  }
};