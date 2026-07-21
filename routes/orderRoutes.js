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

router.put("/:id", updateOrderStatus);

router.delete("/:id", (req, res) => {
    res.status(405).json({
        status: "error",
        message: "Deleting orders is not allowed"
    });
});


export default router;