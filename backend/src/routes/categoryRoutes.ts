import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth";
import { listCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";

const router = Router();
router.get("/", protect, listCategories);
router.post("/", protect, adminOnly, createCategory);
router.put("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);
export default router;
