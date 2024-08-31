import express from "express";
import { ProductController } from "../controller/product.controller.js";

const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.get);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);
router.get("/cheaper-than/:price", ProductController.getProductCheaperThan);

export default router;
