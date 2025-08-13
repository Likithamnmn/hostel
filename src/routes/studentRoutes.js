import express from 'express';
import { checkAuth } from '../middleware/authMiddleware.js';

import { checkPermission } from '../middleware/permissions.js';
import { approveStudentController } from '../controllers/user.Controller.js';

const router = express.Router();

router.post(
  '/approve-student',
  checkAuth,
  checkPermission('approve_student'),
  approveStudentController
);

export default router;
