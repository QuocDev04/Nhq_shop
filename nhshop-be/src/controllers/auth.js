import User from "../models/user";
import { Register } from "../schema/validate";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import BlacklistedToken from "../models/black-listed-token";
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, "123456", { expiresIn: "30d" });
};
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, "123456", { expiresIn: "1m" });
};
export const register = async (req, res) => {
  const { email, password } = req.body;
  const { error } = Register.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((item) => item.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages,
    });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Email đã tồn tại"],
    });
  }
  // Mã hóa mật khẩu
  const hashedPassword = await bcryptjs.hash(password, 10);
  // Nếu không có user nào trong hệ thống thì tạo user đầu tiên là admin
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });
  return res.status(StatusCodes.CREATED).json({
    user,
  });
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        messages: ["Email không tồn tại"],
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: ["Mật khẩu không chính xác"],
      });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    return res.status(StatusCodes.OK).json({
      accessToken,
      refreshToken,
      role: user.role,
      name: user.name,
      email:user.email,
      userId:user.id,
    });

  } catch (error) {
    console.error(`Error finding user with email ${email}:`, error);
  }
};
export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No token provided" });
    }
    // Lưu token vào danh sách đen (blacklist)
    //để ngăn không cho token đó được sử dụng nữa
    const blacklistedToken = new BlacklistedToken({ token });
    await blacklistedToken.save();
    // Gửi phản hồi thành công
    res.status(StatusCodes.OK).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error(`Error during logout:`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
// export const refreshToken = async (req, res) => {
//   try {
//     console.log(req.headers);
//     const oldToken = req.headers.authorization.split(" ")[1];
//     if (!oldToken) {
//       return res.status(401).json({ messages: "Vui lòng kiểm tra lại token" });
//     }

//     // Kiểm tra token có trong blacklist
//     if (await isTokenBlacklisted(oldToken)) {
//       return res.status(401).json({ error: "Token không hợp lệ" });
//     }

//     // Giải mã oldToken để lấy userId
//    let very;
//    try {
//      very = verify(oldToken, "123456");
//    } catch (error) {
//      if (error.name === "TokenExpiredError") {
//        return res.status(401).json({ error: "Hết hạn token, cần làm mới" });
//      } else {
//        return res.status(401).json({ error: "Token không hợp lệ" });
//      }
//    }

//     const userId = very.userId;
//     if (!userId) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ error: "Invalid token payload" });
//     }

//     // Tạo refreshToken mới
//     const newToken = generateRefreshToken(userId);

//     // Trả về refreshToken mới cho client
//     res.status(StatusCodes.OK).json({ newToken });
//   } catch (error) {
//     console.error(`Error during token refresh:`, error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: "Internal Server Error" });
//   }
// };
export const isTokenBlacklisted = async (token) => {
  const tokenInBlacklist = await BlacklistedToken.findOne({ token });
  return !!tokenInBlacklist;
};
export const getAllUser = async (req, res) => {
  try {
    const getAll = await User.find()
    res.json(getAll);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
} 
export const getIdUser = async (req,res)=>{
  try {
    const getId = await User.findById(req.params.id, req.body)
    res.json(getId)
  } catch (error) {
    res.status(400).json({
      message:"fix"
    })
  }
}
export const postIdUser = async (req, res) => {
  try {
    const post = await User.create(req.body);
    res.json(post);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
};
export const putIdUser = async (req, res) => {
  try {
    const put = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(put);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
};
export const delIdUser = async (req, res) => {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    res.json(del);
  } catch (error) {
    res.status(400).json({
      message: "fix",
    });
  }
};