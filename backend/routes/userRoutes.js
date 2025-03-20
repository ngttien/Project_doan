const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getUserProfile);

exports.registerUser = async (req, res) => {
  console.log("Dữ liệu nhận được từ frontend:", req.body); // ✅ Kiểm tra dữ liệu
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
  }

  // Tiếp tục xử lý đăng ký...
};

module.exports = router; // ✅ Đảm bảo export chính xác
