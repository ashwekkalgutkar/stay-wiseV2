import mongoose, { Schema, Document } from 'mongoose';
const BookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
}, { timestamps: true });
export default mongoose.model('Booking', BookingSchema);
//# sourceMappingURL=Booking.js.map