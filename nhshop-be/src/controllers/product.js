
import Product from "../models/product";
import { StatusCodes } from "http-status-codes";

export const getAllProduct = async (req, res) => {
  try {
    const getAll = await Product.find()
      .populate("category")
      // .populate({
      //   path: "attributes",
      //   populate: {
      //     path: "values",
      //   },
      // });
    res.json(getAll);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
};

export const getIdProduct = async (req, res) => {
  try {
    const getId = await Product.findById(req.params.id, req.body)
      .populate("category")
      // .populate({
      //   path: "attributes", 
      //   populate: {
      //     path: "values", 
      //   },
      // });
    res.json(getId);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
};

export const create = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const putProduct = async (req, res) => {
  try {
    const put = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json(put);
  } catch (error) {
    res.status(400).json({
      message: "Không Có Dữ Liệu",
    });
  }
};

export const delProduct = async (req, res) => {
  try {
    const del = await Product.findByIdAndDelete(req.params.id);
    res.json(del);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
};
