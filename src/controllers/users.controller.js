// controller nhận vào req, res
// Nhiệm vụ: chỉ parse request (params, body) sau đó chuyển xuống Service xử lý, nhận kết quả trả về từ service và trả response và cho client
const { response } = require("../helpers/response");
const userService = require("../services/users.service");

// const UserService = require("../services/users.service");

const userController = {
  getUsers: () => {
    return async (req, res, next) => {
      try {
        // const users = await UserService.getAll();
        const users = await userService.getUsers();
        res.status(200).json(response(users));
      } catch (error) {
        // res.status(500).json({ error: error.message });
        next(error);
      }
    };
  },
  createUser: () => {
    return async (req, res, next) => {
      try {
        const user = req.body;
        const createdUser = await userService.createUser(user);
        res.status(200).json(response(createdUser));
      } catch (error) {
        // res.status(500).json({ error: error.message });
        next(error);
      }
    };
  },

  updateUser: () => {
    return async (req, res, next) => {
      try {
        const data = req.body;
        const { id } = req.params;
        const userUpdated = userService.updateUser(id, data);
        res.status(200).json(response(userUpdated));
      } catch (error) {
        // res.status(500).json({ error: error.message });
        next(error);
      }
    };
  },

  deleteUser: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        if (await userService.deleteUser(id)) {
          res.status(200).json(response(true));
        }
      } catch (error) {
        // res.status(500).json({ error: error.message });
        next(error);
      }
    };
  },
};

module.exports = userController;
