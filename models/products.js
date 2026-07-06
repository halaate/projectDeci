import mongoose from "mongoose";

const productSchema = new
mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"]
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "price is required"],
            min: [0, "Price must be greater than or equal to 0"]
        } , 
        stock: {
            type: Number,
            required: [true, "Stock is required"],
            default: 0,
            min: [0, "Stock cannot be negative"]
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"]
        },
        images: [
            {
                type: String,
            }
        ],
        inStock: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);
export default Product;