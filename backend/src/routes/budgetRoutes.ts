import { Router } from "express";
import { protect } from "../middleware/auth";
import { getBudget, setBudget } from "../controllers/budgetController";

const router = Router();
router.use(protect);
router.get("/:month", getBudget);
router.put("/:month", setBudget);
export default router;
