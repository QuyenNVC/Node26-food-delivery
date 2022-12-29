class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// err là instance của AppError
const handleErrors = (err, req, res, next) => {
  throw err;
  // Kiểm tra xem err có phải instance của AppError hay k
  if (!(err instanceof AppError)) {
    err = new AppError(500, "Interal Server");
  }

  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: "error",
    message,
  });

  //   nếu có các middleware phía sau thì phải tiếp tục gọi next để đi tới các middleware phía sau
  next();
};

module.exports = {
  AppError,
  handleErrors,
};
