const registerUser = (req, res) => {
  res.json({ message: "Đăng ký thành công!" });
};

const loginUser = (req, res) => {
  res.json({ message: "Đăng nhập thành công!", token: "fake-jwt-token" });
};

const getUserProfile = (req, res) => {
  res.json({ id: 1, name: "Người dùng", email: "user@example.com" });
};

module.exports = { registerUser, loginUser, getUserProfile };
// Kết quả: Các hàm xử lý API đã được tạo và export
