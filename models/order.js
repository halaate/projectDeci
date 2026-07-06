import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },

                name: {
                    type: String,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                }
            }
        ],

        totalPrice: {
            type: Number,
            required: true
        },

        shippingAddress: {
            type: String,
            required: [true, "Shipping address is required"]
        },

        status: {
            type: String,
            enum: ["Pending", "Processing", "Delivered"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;