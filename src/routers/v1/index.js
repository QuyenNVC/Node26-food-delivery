const express = require("express");
const userController = require("../../controllers/users.controller");
const restaurantController = require("../../controllers/restaurant.controller");
const userRouters = require("./users.router");
const { loginController } = require("../../controllers/auth.controller");
const authorization = require("../../middlewares/authorization");
const { response } = require("../../helpers/response");
const requiredRole = require("../../middlewares/requiredRole");
const { upload } = require("../../controllers/upload.controller");
const uploader = require("../../middlewares/upload");

const v1 = express.Router();

// v1.use("/users", userRouters);

v1.get("/users", userController.getUsers());
v1.post("/users", userController.createUser());
v1.put("/users/:id", userController.updateUser());
v1.delete("/users/:id", userController.deleteUser());

v1.get("/restaurants", restaurantController.getRestaurants());
v1.post(
  "/restaurants/:restaurantId/like",
  authorization,
  restaurantController.likeRestaurant()
);
v1.post(
  "restaurants",
  authorization,
  requiredRole("merchant", "admin"),
  restaurantController.createRestaurant()
);

v1.post("/login", loginController());
v1.get("/profile", authorization, (req, res, next) => {
  try {
    const { user } = res.locals;
    res.status(200).json(response(user));
  } catch (error) {
    console.log("Lỗi");
    next(error);
  }
});

v1.post("/upload", uploader.single("file"), upload());

module.exports = v1;
