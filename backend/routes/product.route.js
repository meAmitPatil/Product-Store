import express from "express";
import mongoose from "mongoose";

import { getProducts, createProducts, deleteProduct, getProductById, updateProduct } from "../controllers/product.controllers.js";


const router = express.Router();

router.post('/', createProducts);
router.delete('/:id', deleteProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);

export default router;