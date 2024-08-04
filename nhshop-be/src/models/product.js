// import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

// const productSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             lowercase: true,
//         },
//         slug: {
//             type: String,
//             unique: true,
//         },
//         category: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Category",
//             required: true,
//         },
//         price: {
//             type: Number,
//             required: true,
//             default: 0,
//         },
//         image: {
//             type: String,
//         },
//         gallery: {
//             type: Array,
//         },
//         description: {
//             type: String,
//         },
//         discount: {
//             type: Number,
//             default: 0,
//         },
//         countInStock: {
//             type: Number,
//             default: 0,
//         },
//         featured: {
//             type: Boolean,
//             default: false,
//         },
//         tags: {
//             type: Array,
//         },
//         attributes: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Attribute",
//             },
//         ],
//     },
//     { timestamps: true, versionKey: false }
// );

// productSchema.plugin(mongoosePaginate);
// export default mongoose.model("Product", productSchema);

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
