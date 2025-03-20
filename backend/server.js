const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/firebase"); // Import Firebase

const authRoutes = require("./routes/authRoutes"); // Import authRoutes
const userRoutes =
  require("./routes/userRoutes").default || require("./routes/userRoutes"); // Import userRoutes

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true })); //cập nhật cors để cho phép gửi cookie
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Route kiểm tra kết nối Firebase
app.get("/test-firebase", async (req, res) => {
  try {
    res.send({ message: "✅ Firebase connected successfully!" });
  } catch (error) {
    res.status(500).send({ message: "❌ Firebase connection failed!", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
