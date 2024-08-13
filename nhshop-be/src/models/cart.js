import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    attribute: [
      {
        attributeId: {
          type: Schema.Types.ObjectId,
          ref: "Attribute",
          required: true,
        },
        ValueAttributeId: {
          type: Schema.Types.ObjectId,
          ref: "ValueAttribute",
          required: true,
        },
      },
    ],
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Đảm bảo mỗi người dùng chỉ có một giỏ hàng
    },
    products: [cartItemSchema],
    totalQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
    finalTotalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingCosts: {
      type: Number,
      required: true,
      default: 50,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);
