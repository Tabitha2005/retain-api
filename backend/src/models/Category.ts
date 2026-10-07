import { Schema, model, InferSchemaType } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type ICategory = InferSchemaType<typeof categorySchema>;
export const Category = model("Category", categorySchema);
