import mongoose, { Schema, Document } from 'mongoose';
const PropertySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
export default mongoose.model('Property', PropertySchema);
//# sourceMappingURL=Property.js.map