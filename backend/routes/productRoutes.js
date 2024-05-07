import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getProducts); //router.route("/").get(getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);

export default router;
