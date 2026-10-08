import { Router } from "express";
import { protect } from "../middleware/auth";
import { createExpense, listExpenses, getExpense, updateExpense, deleteExpense } from "../controllers/expenseController";

const router = Router();
router.use(protect);
router.get("/", listExpenses);
router.post("/", createExpense);
router.get("/:id", getExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
export default router;
