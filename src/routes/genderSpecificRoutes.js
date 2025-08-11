// routes/genderRoutes.js
import express from 'express';
import { checkAuth } from '../middleware/authMiddleware.js';
import { accessControl } from '../middleware/accessControl.js';
import { boysHostel, femaleZone } from '../controllers/HostelController.js';

const router = express.Router();

router.get('/boys-hostel', checkAuth, accessControl([], ['male']), boysHostel);
router.get('/female-zone', checkAuth, accessControl([], ['female']), femaleZone);

export default router;
