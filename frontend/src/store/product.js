import axios from "axios";
import { create } from "zustand";
import ArrayUtils from "../utils/array";

export const useProductStore = create((set) => ({
    products: [],
    empty: false,
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        try {
            const response = await axios.post("/api/products", {
                name: newProduct.name,
                price: newProduct.price,
                image: newProduct.imageUrl,
            });
            set((state) => ({
                products: ArrayUtils.addItemToArray(state.products, response.data.product),
            }));
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            console.error("Error creating product:", error);
            return {
                error: error.response?.data?.message || "Failed to create product",
            };
        }
    },

    getProducts: async () => {
        const response = await axios.get("/api/products");
        set({ products: response.data.products, empty: false });
    },

    deleteProduct: async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`);
            set((state) => ({
                products: ArrayUtils.removeItemFromArray(state.products, productId),
            }));
            return { success: true, message: "Product deleted successfully" };
        } catch (error) {
            console.error("Error deleting product:", error);
            return {
                error: error.response?.data?.message || "Failed to delete product",
            };
        }
    },

    updateProduct: async (productId, updatedProduct) => {
        try {
            await axios.put(`/api/products/${productId}`, updatedProduct);
            set((state) => ({
                products: ArrayUtils.updateItemInArray(state.products, productId, updatedProduct),
            }));
            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            console.log(error);
            return {
                error: error.response?.data?.message || "Failed to update product",
            };
        }
    },

    getProductCheaperThan: async (price) => {
        const response = await axios.get(`/api/products/cheaper-than/${price}`);
        try {
            if (response.data.products.length === 0) {
                set({ empty: true, products: [] });
                return {
                    success: false,
                    empty: true,
                    message: "No products found cheaper than the specified price.",
                };
            }
            set({ products: response.data.products, empty: false });
        } catch (error) {
            console.log(error);
        }
    },
}));
