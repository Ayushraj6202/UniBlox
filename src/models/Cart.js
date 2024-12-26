import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        items: [
            {
                productId: String,
                name: String,
                price: Number,
                quantity: Number
            }
        ],
        total: {
            type: Number,
            default: 0
        },

    },
    { timestamps: true }
);

export default mongoose.model('Cart',CartSchema);