import Product from "../models/product.model.js";
import mongoose from "mongoose";

export class ProductController {
  static async create(req, res) {
    const { name, price, image } = req.body;
    const product = new Product({ name, price, image });

    try {
      const savedProduct = await product.save();
      res.status(201).json({ success: true, product: savedProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create product",
        error: error.message,
      });
    }
  }

  static async get(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          error: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: "Error updating product",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(404).json({ success: false, message: "Product not found" });
    }
  }

  static async getProductCheaperThan(req, res) {
    const { price } = req.params;
    const products = await Product.find({ price: { $lt: price } });
    res.status(200).json({ success: true, products });
  }
}
