import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
    code: String,
    isActive: { type: Boolean, default: true },
    discountPercentage: { type: Number, default: 10 },
}, { timestamps: true });

export default mongoose.model('Discount', discountSchema);