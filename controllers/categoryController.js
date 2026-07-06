import Category from "../models/category.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../middleware/AppError.js";

export const createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create(req.body);

    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category
    });
});

export const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.status(200).json({
        status: "success",
        message: "Categories retrieved successfully",
        data: categories
    });
});

export const getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Category retrieved successfully",
        data: category
    });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: category
    });
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
        data: null
    });
});