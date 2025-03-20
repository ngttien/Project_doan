const { auth } = require("../config/firebase");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
  app.use(express.urlencoded({ extended: true })); // Middleware xử lý dữ liệu từ form

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    // Xác thực token với Firebase
    const decodedToken = await auth.verifyIdToken(token); // Kiểm tra token
    req.user = decodedToken; // Lưu thông tin user vào req.user
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden - Invalid token", error });
  }
};

module.exports = verifyToken;
// Kết quả: Middleware verifyToken đã được tạo và export
