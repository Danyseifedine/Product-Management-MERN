import express from "express";
import connectDB from "./connection/db.js";
import dotenv from "dotenv";
import productRouter from "./router/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
