import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const privateMessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: true,
        default: 'Payment Confirmation'
    },
    body: {
        type: String,
        required: true
    },
    relatedStudentInfo: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['sent', 'read', 'actioned'],
        default: 'sent'
    }
}, { timestamps: true });

const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema);
export default PrivateMessage;