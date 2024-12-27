import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    clientId:{type:String, required:true},
    items: [
        {
            productId: String,
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    total: Number,
    discountApplied: { type: Boolean, default: false },
    discountCode: String,
    discountAmount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);