import Cart from "../models/cart.js";
import Product from "../models/products.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../middleware/AppError.js";

export const addToCart = asyncHandler(async (req, res, next) => {

    const { product, quantity } = req.body;

    const foundProduct = await Product.findById(product);

    if (!foundProduct) {
        return next(new AppError("Product not found", 404));
    }

    if (!foundProduct.inStock) {
        return next(new AppError("Product is out of stock", 400));
    }

    let cart = await Cart.findOne();

    if (!cart) {
        cart = await Cart.create({
            items: [],
            totalPrice: 0
        });
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === product
    );

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({
            product,
            quantity,
            price: foundProduct.price
        });
    }

    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    await cart.save();

    res.status(201).json({
        status: "success",
        message: "Product added to cart",
        data: cart
    });
});

export const getCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne().populate(
        "items.product",
        "name price"
    );

    res.status(200).json({
        status: "success",
        data: cart
    });
});

export const updateCartItem = asyncHandler(async (req, res, next) => {

    const cart = await Cart.findOne();

    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }

    const item = cart.items.id(req.params.id);

    if (!item) {
        return next(new AppError("Item not found", 404));
    }

    item.quantity = req.body.quantity;

    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    await cart.save();

    res.status(200).json({
        status: "success",
        message: "Cart updated",
        data: cart
    });
});

export const deleteCartItem = asyncHandler(async (req, res, next) => {

    const cart = await Cart.findOne();

    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }

    cart.items = cart.items.filter(
        item => item._id.toString() !== req.params.id
    );

    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    await cart.save();

    res.status(200).json({
        status: "success",
        message: "Item removed",
        data: cart
    });
});

export const clearCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne();

    if (cart) {
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
    }

    res.status(200).json({
        status: "success",
        message: "Cart cleared"
    });
});