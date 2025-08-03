import PrivateMessage from '../models/PrivateMessage.model.js';
import User from '../models/User.model.js';

// send a private message to a warden to confirm a student's fee payment (the admin specific routes only)
export const sendPaymentConfirmation = async (req, res) => {
    try {
        const { wardenId, studentName, studentEmail, messageBody } = req.body;
        const adminId = req.user.id; // the admin (logged in)

        if (!wardenId || !studentName || !studentEmail || !messageBody) {
            return res.status(400).json({ error: 'Warden ID, student details, and message body are required.' });
        }

        // verify the recipient is warden (other way around)
        const warden = await User.findById(wardenId);
        if (!warden || warden.role !== 'warden') {
            return res.status(404).json({ error: 'Warden not found.' });
        }

        //private message thread
        const message = new PrivateMessage({
            sender: adminId,
            recipient: wardenId,
            body: messageBody,
            relatedStudentInfo: {
                name: studentName,
                email: studentEmail,
            }
        });

        await message.save();

        res.status(201).json({ message: 'Payment confirmation sent to the warden successfully.' });

    } catch (error) {
        console.error('Send Confirmation Error:', error);
        res.status(500).json({ error: 'Server error while sending confirmation.' });
    }
};
