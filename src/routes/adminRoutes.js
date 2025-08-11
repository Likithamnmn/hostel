// routes/adminRoutes.js
import express from 'express';
import { checkAuth } from '../middleware/authMiddleware.js';
import { accessControl } from '../middleware/accessControl.js';
import { sendPaymentConfirmation } from '../controllers/adminController.js';

const router = express.Router();

// Only admins can send payment confirmations
router.post(
  '/send-payment-confirmation',
  checkAuth,
  accessControl(['admin']), // ensures only admins hit the controller
  sendPaymentConfirmation
);

export default router;
