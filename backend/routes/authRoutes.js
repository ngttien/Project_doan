const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const authController = require("../controllers/authController");

// 📝 Kiểm tra dữ liệu đầu vào trước khi gọi controller
router.post(
  "/register",
  (req, res, next) => {
    console.log("📩 Dữ liệu nhận từ frontend:", req.body); // ✅ Kiểm tra dữ liệu gửi lên

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    next(); // Chuyển sang `authController.registerUser`
  },
  authController.registerUser
);

// 📝 Đăng nhập người dùng
router.post("/login", authController.loginUser);

// 📝 Lấy thông tin user từ token (Cần xác thực)
router.get("/profile", verifyToken, authController.getUserProfile);

module.exports = router;
