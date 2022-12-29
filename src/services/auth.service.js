const { AppError } = require("../helpers/error");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");

const login = async (credentials) => {
  try {
    const { email, password } = credentials;
    const user = await User.findOne({
      where: { email },
      attributes: {
        include: ["password"],
      },
    });
    if (!user) {
      throw new AppError(404, "Email or Password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
      throw new AppError(404, "Email or Password invalid");
    }

    return generateToken(user);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
};
