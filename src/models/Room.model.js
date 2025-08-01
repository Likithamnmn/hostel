import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomNumber: {
        type: String,
        required: true,
        trim: true
    },
    hostelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    //list of student ids currently occupying the room
    occupants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['available', 'full', 'maintenance'],
        default: 'available'
    }
}, { timestamps: true });

// To prevent creating duplicate room numbers within the same hostel.
roomSchema.index({ roomNumber: 1, hostelId: 1 }, { unique: true });

const Room = mongoose.model('Room', roomSchema);
export default Room;