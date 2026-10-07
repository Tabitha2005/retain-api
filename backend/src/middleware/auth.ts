import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type Role = "user" | "admin";

export interface AuthRequest extends Request {
  user?: { id: string; role: Role };
}

export function protect(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET as string) as {
      id: string;
      role: Role;
    };
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction): void {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }
  next();
}