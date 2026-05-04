import express from "express";
import {auth} from "../middleware/authMiddleware.js";
import { createRazorpayOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post('/create-order', auth, createRazorpayOrder);
router.post('/verify', auth, verifyPayment);

export default router;