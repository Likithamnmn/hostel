import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const hostelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['boys', 'girls'],
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    }
}, { timestamps: true });

const Hostel = mongoose.model('Hostel', hostelSchema);
export default Hostel;