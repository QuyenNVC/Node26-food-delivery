const { response } = require("../helpers/response");
const { login } = require("../services/auth.service");

const loginController = () => {
  return async (req, res, next) => {
    try {
      const user = await login(req.body);
      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  loginController,
};
