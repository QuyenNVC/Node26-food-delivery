const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const EXPIRES_IN = 60 * 60 * 12;

const generateToken = (payload) => {
  const token = jwt.sign(
    {
      id: payload.id,
      email: payload.email,
    },
    SECRET_KEY,
    {
      expiresIn: EXPIRES_IN,
    }
  );

  return {
    token,
    expiresIn: EXPIRES_IN,
  };
};

module.exports = {
  generateToken,
};
