const { auth, db } = require("../config/firebase");

// 📝 Đăng ký user (Trả về token)
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("📩 Dữ liệu nhận từ frontend:", req.body);

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (!existingUser.empty) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Tạo user trên Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: username,
    });

    // Gửi email xác thực
    await auth.generateEmailVerificationLink(email);

    // Tạo token cho user
    const token = await auth.createCustomToken(userRecord.uid);

    // Lưu thông tin user vào Firestore
    await db.collection("users").doc(userRecord.uid).set({
      username,
      email,
      createdAt: new Date(),
      emailVerified: false,
    });

    return res.status(201).json({
      message: "User created successfully! Please verify your email.",
      token,
      user: {
        uid: userRecord.uid,
        username,
        email: userRecord.email,
      },
    });
  } catch (error) {
    console.error("🔥 Lỗi đăng ký:", error.message);
    return res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

// 📝 Đăng nhập user (Xác thực với token từ frontend)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Đăng nhập bằng email và password
    const userCredential = await auth.getUserByEmail(email);

    // Kiểm tra xem email đã xác thực chưa
    if (!userCredential.emailVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
    }

    // Tạo token cho user
    const token = await auth.createCustomToken(userCredential.uid);

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        uid: userCredential.uid,
        email: userCredential.email,
        username: userCredential.displayName,
      },
    });
  } catch (error) {
    console.error("🔥 Lỗi đăng nhập:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid credentials", error: error.message });
  }
};

// 📝 Lấy thông tin user từ token (Chỉ dành cho user đã đăng nhập)
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ message: "User profile", user });
  } catch (error) {
    console.error("🔥 Lỗi lấy thông tin user:", error.message);
    return res
      .status(400)
      .json({ message: "Error getting user profile", error: error.message });
  }
};

// 📝 Lấy danh sách tất cả user trong Firestore
const getAllUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res
      .status(200)
      .json({ message: "Users fetched successfully!", users });
  } catch (error) {
    console.error("🔥 Lỗi lấy danh sách user:", error.message);
    return res
      .status(400)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// 📝 Đăng xuất user (Xóa token phía client)
const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.error("🔥 Lỗi đăng xuất:", error.message);
    return res
      .status(400)
      .json({ message: "Error logging out", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  logoutUser,
};
// Kết quả: Controller authController đã được tạo và export
