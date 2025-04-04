import express from "express";
import {
  createOrder,
  getOrderHistory,
  getOrderHistoryId,
  guestOrder,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrderHistory);
router.get("/:orderId", verifyToken, getOrderHistoryId);

router.post("/guest", guestOrder);

export default router;
