import express from "express";

import { getProducts, createProducts, deleteProduct, updateProduct } from "../controllers/product.controllers.js";


const router = express.Router();

router.post('/', createProducts);
router.delete('/:id', deleteProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);

export default router;