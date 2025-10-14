import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  images: string[];
  owner: mongoose.Types.ObjectId;
}

const PropertySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IProperty>('Property', PropertySchema);
