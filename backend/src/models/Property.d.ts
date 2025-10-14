import mongoose, { Document } from 'mongoose';
export interface IProperty extends Document {
    title: string;
    description: string;
    city: string;
    address: string;
    price: number;
    images: string[];
    owner: mongoose.Types.ObjectId;
}
declare const _default: mongoose.Model<IProperty, {}, {}, {}, mongoose.Document<unknown, {}, IProperty, {}, {}> & IProperty & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Property.d.ts.map