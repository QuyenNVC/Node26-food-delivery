const express = require("express");
const { PORT } = require("./config");
const { AppError, handleErrors } = require("./helpers/error");
const authorization = require("./middlewares/authorization");
const { sequelize } = require("./models");
sequelize.sync({ alter: false });
// sequelize.sync({ alter: true });
const v1 = require("./routers/v1");
const app = express();

// app.use tùy theo vị trí đối với controller để biết gọi trước hay sau
app.use(express.json());
// Static là lệnh lấy thư mục gốc ./uploads thì uploads sẽ là thư mục gốc
app.use(express.static("."));

app.use("/api/v1", v1);

app.get("/auth", authorization, (req, res, next) => {
  try {
    console.log("auth");
  } catch (error) {
    next(error);
  }
});

// demo handle error
app.get("/error", (req, res, next) => {
  //   throw new AppError(500, "Lỗi server");
  // hoặc sử dụng
  next(new AppError(500, "Lỗi server"));
});

// middleware dùng để bắt lỗi
app.use(handleErrors);

app.listen(PORT);
