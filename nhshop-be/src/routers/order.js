import { Router } from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/order";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:userId/:_id", getOrderById);
export default router;
