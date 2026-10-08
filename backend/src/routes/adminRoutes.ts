import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth";
import { getInsights } from "../controllers/adminController";

const router = Router();
router.use(protect, adminOnly);
router.get("/insights", getInsights);
export default router;
