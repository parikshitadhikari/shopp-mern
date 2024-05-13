import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.get("/", getProducts); //router.route("/").get(getProducts);
router.get("/top", getTopProducts);
router.get("/:id", checkObjectId, getProductById);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, checkObjectId, updateProduct);
router.delete("/:id", protect, admin, checkObjectId, deleteProduct);
router.post("/:id/reviews", protect, checkObjectId, createProductReview);

export default router;
