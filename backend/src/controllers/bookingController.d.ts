import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
export declare const createBooking: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getMyBookings: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAllBookings: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=bookingController.d.ts.map