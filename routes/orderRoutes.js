import express from "express";
import {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/:id", getOrder);

router.patch("/:id", updateOrderStatus);

export default router;