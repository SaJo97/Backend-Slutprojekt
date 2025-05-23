import express from "express";
import { deleteUser, getAllUsers, login, register, updateUserRole } from "../controllers/user.controller.js";
import { verifyRoles, verifyToken } from "../middleware/auth.middleware.js";
import ROLES from "../constants/roles.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", verifyToken, verifyRoles(ROLES.ADMIN), getAllUsers); // Get all users
router.delete("/users/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteUser ); // Delete a user by ID
router.put("/users/:id/role", verifyToken, verifyRoles(ROLES.ADMIN), updateUserRole); // Update user role by ID

export default router;
