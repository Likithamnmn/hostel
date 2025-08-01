import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['hostel_fee', 'mess_fee', 'security_deposit', 'other'],
        required: true
    },
    status: {
        type: String,
        enum: ['paid', 'due', 'overdue'],
        default: 'due'
    },
    dueDate: {
        type: Date,
        required: true
    },
    //payment gateway(Stripe, Razorpay)
    transactionId: {
        type: String,
        default: null
    },
    paymentDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;