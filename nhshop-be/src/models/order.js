import mongoose from "mongoose";

// const generateOrderNumber = () => {
//   const timestamp = Date.now().toString();
//   const random = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(3, "0");
//   return `${timestamp}-${random}`;
// };

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false } // Không tạo _id cho mỗi item trong mảng products);
);
// Schema cho thông tin địa chỉ
const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
    },
    commune_ward: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
    },
  },
  { _id: false }
); // Không tạo _id cho mỗi item trong mảng products););
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    items: [orderItemSchema],
    //   orderNumber: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //   },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    addresses: [addressSchema],
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    orderNotes: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

// Pre-save hook to generate orderNumber
// orderSchema.pre("save", function (next) {
//   if (!this.orderNumber) {
//     this.orderNumber = generateOrderNumber();
//     console.log(`Generated Order Number: ${this.orderNumber}`); // Log generated number
//   } else {
//     console.log(`Order Number already exists: ${this.orderNumber}`); // Log existing number
//   }
//   next();
// });

export default mongoose.model("Order", orderSchema);

