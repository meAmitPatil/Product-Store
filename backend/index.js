import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post('/api/products', async(req, res) => {
    const product = req.body

    if (!product.name || !product.price|| !product.image) {
        return res.status(400).json({ success:false, message: 'Please add all fields' })
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save()
        res.status(201).json({ success:true, data:newProduct, message: 'Product added successfully' });
    } catch (error) {
        console.status("Error in Create product:", error.message);
        res.status(500).json({ success:false, message: error.message });
    }
});

app.listen(3000, () => {
    connectDB()
    console.log('Server is running on port 3000');
});