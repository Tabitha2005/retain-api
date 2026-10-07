import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/auth";

function signToken(id: string, role: string): string {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export async function register(req: AuthRequest, res: Response): Promise<void> {
  const { name, email, password } = req.body as Record<string, string | undefined>;
  if (!name || !email || !password || password.length < 6) {
    res.status(400).json({ message: "Name, email and a password of 6+ characters are required" });
    return;
  }
  if (await User.findOne({ email: email.toLowerCase() })) {
    res.status(409).json({ message: "Email already registered" });
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role: "user" });
  res.status(201).json({
    token: signToken(user.id, user.role),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

export async function login(req: AuthRequest, res: Response): Promise<void> {
  const { email, password } = req.body as Record<string, string | undefined>;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  res.json({
    token: signToken(user.id, user.role),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

export async function me(req: AuthRequest, res: Response): Promise<void> {
  const user = await User.findById(req.user?.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
}
