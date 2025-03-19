const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  // Code này chạy khi không có route nào được định nghĩa khớp với yêu cầu
  // Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
  // Middleware này xử lý mọi lỗi được ném ra trong ứng dụng
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
