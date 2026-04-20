import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
import { auth } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:slug', getSingleProduct);
router.post('/', auth, adminMiddleware, createProduct);
router.put('/:slug', auth, adminMiddleware, updateProduct);
router.delete('/:slug', auth, adminMiddleware, deleteProduct);

export default router;