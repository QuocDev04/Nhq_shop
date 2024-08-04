import { verify } from "jsonwebtoken";
import User from "../models/user";
import { isTokenBlacklisted } from "../controllers/auth";
export const checkAuth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ messages: "Vui lòng kiểm tra lại token" });
    }
    // Kiểm tra token có trong blacklist
    if (await isTokenBlacklisted(token)) {
      return res.status(401).json({ error: "Token không hợp lệ" });
    }
    let very;
    try {
      very = verify(token, "123456");
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Hết hạn token, cần làm mới" });
      } else {
        return res.status(401).json({ error: "Token không hợp lệ" });
      }
    }
    const user = await User.findOne({ _id: very.userId });
    if (!user || user.role !== "admin") {
      return res.status(401).json({ error: "Nạp 10 tỷ vào thì mới cho vào" });
    }

    // Thêm user vào req để sử dụng ở các middleware tiếp theo
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      messages: "Ban can Dang Nhap",
    });
  }
};
