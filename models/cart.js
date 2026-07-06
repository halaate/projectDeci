import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],

        totalPrice: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;