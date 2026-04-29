import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cart.controller.js";

const router = express.Router();

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.put('/:productId', auth, updateCartItem);
router.delete('/:productId', auth, removeCartItem);
router.delete('/', auth, clearCart);

export default router;