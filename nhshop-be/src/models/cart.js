import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    // Tính giá sau khi áp dụng khuyến mãi (nếu có)
    finalPrice: {
      type: Number,
    },
  },
  { _id: false } // Không tạo _id cho mỗi item trong mảng productshông tạo _id cho môĩ item trong mảng products
);

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique:true,  // Đảm bảo mỗi người dùng chỉ có một giỏ hàng
        },
        products:[cartItemSchema],
        totalQuantity:{
            type:Number,
            required:true,
            default:0
        },
        totalPrice:{
            type:Number,
            required:true,
            default:0
        },
        totalDiscount:{
            type:Number,
            default:0
        },
        finalTotalPrice:{
            type:Number,
            required:true,
            default:0
        }
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);
