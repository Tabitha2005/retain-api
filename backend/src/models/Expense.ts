import { Schema, model, InferSchemaType } from "mongoose";

export const PAYMENT_METHODS = ["cash", "card", "mobile_money", "bank_transfer", "other"] as const;

const expenseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0.01 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
    date: { type: Date, required: true, index: true },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export type IExpense = InferSchemaType<typeof expenseSchema>;
export const Expense = model("Expense", expenseSchema);
