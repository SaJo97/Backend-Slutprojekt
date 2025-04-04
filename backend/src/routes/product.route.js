import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createNewProduct); // CREATE

router.get("/", getAllProducts); // READ
router.get("/:id", getProduct); // READ BY ID

router.put("/:id", updateProduct); // UPDATE
router.patch("/:id", updateProduct); // UPDATE

router.delete("/:id", deleteProduct); // DELETE

export default router;
