

import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
    },
    gallery: {
      type: [String], 
    },
    discount: {
      type: Number,
      default: 0,
    },
    countInstock: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
    },
    tags: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Product", productSchema);
