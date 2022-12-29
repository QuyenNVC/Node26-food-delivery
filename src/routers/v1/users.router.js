const express = require("express");
const { getUsers } = require("../../controllers/users.controller");

const userRouters = express.Router();

userRouters.get("", getUsers());

module.exports = userRouters;
