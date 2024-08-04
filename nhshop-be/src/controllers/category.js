// import { StatusCodes } from "http-status-codes";
// import Category from "../models/category";
// import Category from "../models/Category";
// import slugify from "slugify";
// export const create = async (req, res) => {
//     try {
//         const categoy = await Category.create({
//             name: req.body.name,
//             slug: slugify(req.body.name, "-"),
//         });

//         return res.status(StatusCodes.CREATED).json(categoy);
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// };

// export const getAll = async (req, res) => {
//     try {
//         const categories = await Category.find({});
//         if (categories.length === 0) {
//             return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có danh mục nào!" });
//         }
//         return res.status(StatusCodes.OK).json(categories);
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// };
// export const getCategoryById = async (req, res) => {
//     // GET /categories/65fef32d75398a9a92b694da
//     // { name: "Danh mục 1", Categorys: []}
//     try {
//         const Categorys = await Category.find({ category: req.params.id });
//         const category = await Category.findById(req.params.id);
//         if (category.length === 0)
//             return res
//                 .status(StatusCodes.NOT_FOUND)
//                 .json({ message: "Không tìm thấy sản phẩm nào!" });
//         return res.status(StatusCodes.OK).json({
//             category,
//             Categorys,
//         });
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// };
// export const deleteCategoryById = async (req, res) => {
//     try {
//         const category = await Category.findByIdAndDelete(req.params.id);
//         return res.status(StatusCodes.OK).json(category);
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// };
// export const updateCategoryById = async (req, res) => {
//     try {
//         const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         return res.status(StatusCodes.OK).json(category);
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//     }
// };

// // iphone 13 Category max => /Category/iphone-13-Category-max
// // GET /Category/:slug

import slugify from "slugify";
import Category from "../models/category";
import { StatusCodes } from "http-status-codes";
import Product from "../models/product";

export const getAllCategory = async (req, res) => {
  try {
    const getAll = await Category.find();
    res.json(getAll);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
};

export const getIdCategory = async (req, res) => {
  // GET /categories/65fef32d75398a9a92b694da
  // { name: "Danh mục 1", products: []}
  try {
    const product = await Product.find({category: req.params.id})
    const category = await Category.findById(req.params.id, req.body);
    if(category.length === 0 )
        return res
    .status(StatusCodes.NOT_FOUND)
    .json({message:"Không tìm thấy sản phẩm nào!"})
    return res.status(StatusCodes.OK).json({
        category,
        product,
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({error})
  }
};

export const postCategory = async (req, res) => {
  try {
    // iphone 13 product max => /product/iphone-13-product-max
    // GET /product/:slug
    const postCategory = await Category.create({
      name: req.body.name,
      slug: slugify(req.body.name, "-"),
    });

    return res.status(StatusCodes.CREATED).json(postCategory);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export const putCategory = async (req, res) => {
  try {
    const put = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json(put);
  } catch (error) {
    res.status(400).json({
      message: "Không Có Dữ Liệu",
    });
  }
};

export const delCategory = async (req, res) => {
  try {
    const del = await Category.findByIdAndDelete(req.params.id);
    res.json(del);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
};