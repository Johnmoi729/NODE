require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courses");

const app = express();
const port = process.env.PORT || 3000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/courses", courseRoutes);

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
