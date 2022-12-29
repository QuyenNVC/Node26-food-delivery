const { AppError } = require("../helpers/error");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const extractTokenFromHeader = (headers) => {
  const bearerToken = headers.authorization;
  if (!bearerToken) {
    throw new AppError(401, "Invalid Token");
  }
  const parts = bearerToken.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1].trim()) {
    throw new AppError(401, "Invalid Token");
  }

  return parts[1];
};

module.exports = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    const payload = jwt.verify(token, "cybersoft-node26");
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw new AppError(401, "Invalid Token");
    }

    // Lưu trữ thông tin user vào request để có thể truy cập ở các middleware hoặc controller tiếp theo
    res.locals.user = user;

    // muốn chạy ra tiếp những thằng đằng sau thì phải gọi next
    next();
  } catch (error) {
    // Đối với những hàm asynchronous thì bắt buộc phải dùng next(error) để pass qua middleware tiếp theo
    if (error instanceof jwt.JsonWebTokenError) {
      error = new AppError(401, "Invalid Token");
    }
    next(error);
  }
};
