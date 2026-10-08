import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import categoryRoutes from "./routes/categoryRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((o) => o.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many failed attempts. Try again in a few minutes." },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;
