import AppError from "./middleware/AppError.js";
import express from "express";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./config/config.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(mongoSanitize());
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "the API is working",
    });
})

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    next(new AppError("Route not found", 404));
});

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
