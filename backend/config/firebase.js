const admin = require("../config/firebase").admin;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    // Xác thực token với Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
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
