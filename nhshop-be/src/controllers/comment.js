import { StatusCodes } from "http-status-codes";
import Comment from "../models/comment";
import User from "../models/user";

export const postComment = async (req, res) => {
  const { userId, productId, text } = req.body;

  if (!userId || !productId || !text) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Thiếu thông tin cần thiết để tạo bình luận",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Người dùng không tồn tại",
      });
    }

    // Tạo bình luận với thông tin người dùng
    const newComment = await Comment.create({
      user: {
        userId: user._id,
        name: user.name,
        avatar: user.avatar,
      },
      productId,
      text,
    });

    res.status(StatusCodes.CREATED).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const getAll = await Comment.find();
    res.json(getAll);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const getIdComment = async (req, res) => {
  try {
    const getId = await Comment.findById(req.params.id, req.body);
    res.json(getId);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const putComment = async (req, res) => {
  try {
    const putId = await Comment.findByIdAndUpdate(req.params.id, req.body);
    res.json(putId);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const delId = async (req, res) => {
  try {
    const delId = await Comment.findByIdAndDelete(req.params.id);
    res.json(delId);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Lỗi máy chủ nội bộ" });
  }
};
