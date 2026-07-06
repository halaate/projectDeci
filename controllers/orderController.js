import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/products.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../middleware/AppError.js";

export const createOrder = asyncHandler(async (req, res, next) => {

    const cart = await Cart.findOne().populate("items.product");

    if (!cart || cart.items.length === 0) {
        return next(new AppError("Cart is empty", 400));
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {

        const product = await Product.findById(item.product._id);

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        if (product.stock < item.quantity) {
            return next(
                new AppError(`Not enough stock for ${product.name}`, 400)
            );
        }

        product.stock -= item.quantity;

        if (product.stock === 0) {
            product.inStock = false;
        }

        await product.save();

        totalPrice += product.price * item.quantity;

        orderItems.push({
            product: product._id,
            name: product.name,
            quantity: item.quantity,
            price: product.price
        });
    }

    const order = await Order.create({
        orderNumber: "ORD-" + Date.now(),
        items: orderItems,
        totalPrice,
        shippingAddress: req.body.shippingAddress
    });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(201).json({
        status: "success",
        message: "Order placed successfully",
        data: order
    });

});

export const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find();

    res.status(200).json({
        status: "success",
        data: orders
    });

});

export const getOrder = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: order
    });

});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new AppError("Order not found", 404));
    }

    const allowedStatus = ["Pending", "Processing", "Delivered"];

    if (!allowedStatus.includes(req.body.status)) {
        return next(new AppError("Invalid order status", 400));
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
        status: "success",
        message: "Order updated successfully",
        data: order
    });

});