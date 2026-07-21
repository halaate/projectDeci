import express from "express";

import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router
    .route("/")
    .get(getCategories)
    .post(createCategory);

router
    .route("/:id")
    .get(getCategory)
    .put(updateCategory)
    .patch(updateCategory)
    .delete(deleteCategory);

export default router;