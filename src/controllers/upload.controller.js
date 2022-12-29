const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

module.exports = {
  upload: () => {
    return (req, res, next) => {
      const file = req.file;
      if (!file) {
        next(new AppError(400, "Please upload a file"));
      }
      const url = `http://localhost:4000/${file.path}`;
      res.status(200).json(response(url.replace(/\\/g, "/")));
    };
  },
};
