import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyRoles, verifyToken } from "../middleware/auth.middleware.js";
import ROLES from "../constants/roles.js";

const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), createNewProduct); // CREATE

router.get("/", getAllProducts); // READ
router.get("/:id", getProduct); // READ BY ID

router.put("/:id", verifyToken, verifyRoles(ROLES.ADMIN), updateProduct); // UPDATE
router.patch("/:id", verifyToken, verifyRoles(ROLES.ADMIN), updateProduct); // UPDATE

router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteProduct); // DELETE

export default router;
