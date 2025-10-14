import { Router } from 'express';
import { createBooking, getMyBookings, getAllBookings } from '../controllers/bookingController.js';
import { authenticateJWT, requireAdmin } from '../middleware/auth.js';
const router = Router();
router.post('/', authenticateJWT, createBooking);
router.get('/me', authenticateJWT, getMyBookings);
router.get('/all', authenticateJWT, requireAdmin, getAllBookings);
export default router;
//# sourceMappingURL=booking.js.map