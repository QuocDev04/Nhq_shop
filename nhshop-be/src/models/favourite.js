import mongoose, { Schema, Types } from "mongoose";
const favouriteProduct = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    _id: false,
  }
);

const favourite = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [favouriteProduct],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Favourite", favourite);
