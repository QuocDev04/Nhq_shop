import Joi from "joi";

export const ProductSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name pai nhap",
    "string.empty": "Name kh bo trong",
  }),
  img: Joi.string().required().messages({
    "any.required": "img pai nhap",
    "string.empty": "img kh bo trong",
  }),
  category: Joi.string().required().messages({
    "any.required": "category pai nhap",
    "string.empty": "category kh bo trong",
  }),
  price: Joi.number().required().min(0).max(10000000000).messages({
    "any.required": "price pai nhap",
    "number.empty": "price kh bo trong",
    "number.min": "price kh nho hon 0",
    "number.max": "price kh lon hon 10000000000",
  }),
  description: Joi.string().messages({}),
});

export const Register = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    "string.min": "Trường Name phải có ít nhất {#limit} ký tự",
    "string.max": "Trường Name không được vượt quá {#limit} ký tự",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Trường Email là bắt buộc",
    "string.empty": "Trường Email không được để trống",
    "string.email": "Trường Email phải là email hợp lệ",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Trường Password là bắt buộc",
    "string.empty": "Trường Password không được để trống",
    "string.min": "Trường Password phải có ít nhất {#limit} ký tự",
    "string.max": "Trường Password không được vượt quá {#limit} ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Trường Confirm Password là bắt buộc",
    "any.only": "Mật khẩu không trùng khớp",
  }),
  avatar: Joi.string().uri().messages({
    "string.uri": "Trường Avatar phải là đường dẫn hợp lệ",
  }),
});
export const Login = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Trường Email là bắt buộc",
    "string.empty": "Trường Email không được để trống",
    "string.email": "Trường Email phải là email hợp lệ",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Trường Password là bắt buộc",
    "string.empty": "Trường Password không được để trống",
    "string.min": "Trường Password phải có ít nhất {#limit} ký tự",
    "string.max": "Trường Password không được vượt quá {#limit} ký tự",
  }),
});