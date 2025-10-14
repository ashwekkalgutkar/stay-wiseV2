import type { Request, Response } from 'express';
import Booking from '../models/Booking.js';
import type { AuthRequest } from '../middleware/auth.js';

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { property, startDate, endDate } = req.body;
    const booking = await Booking.create({
      user: req.user!._id,
      property,
      startDate,
      endDate,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create booking', error: err });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user!._id }).populate('property');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err });
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find().populate('property user');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all bookings', error: err });
  }
};
