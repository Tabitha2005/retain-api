import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export type Role = "user" | "admin";

export interface AuthRequest extends Request {
  user?: { id: string; role: Role };
}

export async function protect(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  let id: string;
  try {
    id = (jwt.verify(header.slice(7), process.env.JWT_SECRET as string) as { id: string }).id;
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }

  // The role comes from the database on every request, so a changed or deleted account loses access straight away.
  const user = await User.findById(id).select("role");
  if (!user) {
    res.status(401).json({ message: "Account no longer exists" });
    return;
  }

  req.user = { id: user.id, role: user.role as Role };
  next();
}

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction): void {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }
  next();
}
