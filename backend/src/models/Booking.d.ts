import mongoose, { Document } from 'mongoose';
export interface IBooking extends Document {
    user: mongoose.Types.ObjectId;
    property: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
}
declare const _default: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, {}> & IBooking & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Booking.d.ts.map