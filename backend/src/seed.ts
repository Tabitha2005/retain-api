import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { User } from "./models/User";
import { Category } from "./models/Category";

const STARTER_CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Health", "Entertainment", "Education", "Shopping"];

async function seed(): Promise<void> {
  await connectDB();

  await Category.updateOne(
    { name: "Uncategorized" },
    { $set: { isDefault: true } },
    { upsert: true }
  );

  for (const name of STARTER_CATEGORIES) {
    await Category.updateOne({ name }, { $setOnInsert: { name, isDefault: false } }, { upsert: true });
  }

  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log("Existing user promoted to admin");
  } else {
    await User.create({ name: "Admin", email, password: await bcrypt.hash(password, 10), role: "admin" });
    console.log("Admin user created");
  }

  console.log("Seed complete");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
