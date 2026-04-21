import express from "express";
import {auth} from "../middleware/authMiddleware.js";
import {adminMiddleware} from "../middleware/adminMiddleware.js";
import { createOrder, getAllOrders, getMyOrders, getSingleOrder, updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/my', auth, getMyOrders);
router.get('/:id', auth, getSingleOrder)
router.get('/', auth, adminMiddleware, getAllOrders);
router.put('/:id', auth, adminMiddleware, updateOrderStatus);

export default router;