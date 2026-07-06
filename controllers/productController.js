import Product from "../models/products.js";
import Category from "../models/category.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../middleware/AppError.js";

export const createProduct = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.body.category);

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    const product = await Product.create(req.body);

    res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: product
    });
});

export const getProducts = asyncHandler(async (req, res) => {

    let filter = {};

    if (req.query.category) {
        filter.category = req.query.category;
    }

    if (req.query.minPrice) {
        filter.price = { ...filter.price, $gte: Number(req.query.minPrice) };
    }

    if (req.query.maxPrice) {
        filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) };
    }

    if (req.query.inStock) {
        filter.inStock = req.query.inStock === "true";
    }

    if (req.query.search) {
        filter.name = {
            $regex: req.query.search,
            $options: "i"
        };
    }

    const products = await Product.find(filter);

    res.status(200).json({
        status: "success",
        message: "Products retrieved successfully",
        data: products
    });
});

export const getProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
        .populate("category", "name description");

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Product retrieved successfully",
        data: product
    });
});

export const updateProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: product
    });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        data: null
    });
});