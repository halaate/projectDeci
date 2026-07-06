import express from "express";
import {
    addToCart,
    getCart,
    updateCartItem,
    deleteCartItem,
    clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", addToCart);

router.get("/", getCart);

router.patch("/:id", updateCartItem);

router.delete("/:id", deleteCartItem);

router.delete("/", clearCart);

export default router;