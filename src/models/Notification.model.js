import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    genderTarget: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    targetHostel: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel',
        default: null
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;