import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'warden'],
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    accountStatus: {
        type: String,
        enum: ['pending_verification', 'active', 'suspended'],
        default: 'pending_verification'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    hostelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel', default: null
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        default: null
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;