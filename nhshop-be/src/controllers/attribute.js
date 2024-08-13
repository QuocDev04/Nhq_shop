
import { StatusCodes } from "http-status-codes";
import Attribute, { ValueAttributeModel } from "../models/attribute";

//Post
export const CreateAttrubite = async (req, res) => {
  try {
    const post = await Attribute.create(req.body);
    res.json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

//Post Values
export const createValueAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.attributesId);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    const postValues = await ValueAttributeModel.create(req.body);
    attribute.values.push(postValues);
    await attribute.save();
    res.json(postValues);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

//GetAllAttru
export const GetAll = async (req, res) => {
  try {
    const getAll = await Attribute.find().populate({
      path: "values", 
    });;
    res.json(getAll);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

//GetAllValues
export const GetAllValues = async (req, res) => {
  try {
    const getAll = await ValueAttributeModel.find();
    res.json(getAll);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

//GetIdAttru
export const GetId = async (req, res) => {
  try {
    const getId = await Attribute.findById(req.params.id, req.body);
    if (!getId) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "NOT_FOUND" });
    }
    res.json(getId);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

//getIdValue
export const getIdValue = async (req, res) => {
  try {
    const getId = await ValueAttributeModel.findById(req.params.id, res.body);
    if (!getId) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "NOT_FOUND" });
    }
    res.json(getId);
  } catch (error) {}
};

//putAtttru
export const putAttru = async (req, res) => {
  try {
    const putAttru = await Attribute.findByIdAndUpdate(req.params.id, req.body);
    res.json(putAttru);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

//putValue
export const putValue = async (req, res) => {
  try {
    const putValue = await ValueAttributeModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(putValue);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

//delAttru
export const delAttru = async (req, res) => {
  try {
    const delAttru = await Attribute.findByIdAndDelete(req.params.id);
    res.json(delAttru);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

//delValue
export const delValue = async (req, res) => {
  try {
    const delValue = await ValueAttributeModel.findByIdAndDelete(req.params.id);
    res.json(delValue);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};
