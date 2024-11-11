import Product from "../models/product.model.js"

export const getProducts = async(req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json({ success:true, data:products, message: 'Products fetched successfully' });
    } catch (error) {
        console.status("Error in Get products:", error.message);
        res.status(500).json({ success:false, message: error.message });
    }
}

export const getProductById = async(req, res) => {
    const {id} = req.params

    try{
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ success:false, message: 'Product not found' })
        }
        res.status(200).json({ success:true, data:product, message: 'Product fetched successfully' });
    } catch (error) {
        console.status("Error in Get product:", error.message);
        res.status(500).json({ success:false, message: error.message });
    }
}

export const createProducts = async(req, res) => {
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
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params
    
    try{
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ success:false, message: 'Product not found' })
        }
        res.status(200).json({ success:true, data:product, message: 'Product deleted successfully' });
    } catch (error) {
        console.status("Error in Delete product:", error.message);
        res.status(500).json({ success:false, message: error.message });
    }
}

export const updateProduct = async(req, res) => {
    const {id} = req.params
    const product = req.body

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true})
        if (!updatedProduct) {
            return res.status(404).json({ success:false, message: 'Product not found' })
        }
        res.status(200).json({ success:true, data:updatedProduct, message: 'Product updated successfully' });
    } catch (error) {
        console.status("Error in Update product:", error.message);
        res.status(500).json({ success:false, message: error.message });
    }
}