import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching products");
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //user will send this data
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ sucess: false, message: "please provide all fields" });
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "invalid product Id" });
  }
  
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.log("error in delete product:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "invalid product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct, message: "product updated successfully" });
    } catch (error) {
        console.log("error in update product", error.message);
        res.status(500).json({ success: false, message: "error in update product" });
    }
};