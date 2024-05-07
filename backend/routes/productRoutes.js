import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getProducts); //router.route("/").get(getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct)

export default router;
