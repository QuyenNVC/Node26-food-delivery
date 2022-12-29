// service: Nhận data từ controller
// Nhiệm vụ: xử lý nghiệm vụ của ứng dụng, su đó gọi tới model của sequelize để query xuống database, nhận data từ DB và return cho controller
const { AppError } = require("../helpers/error");
const { User, Restaurant } = require("../models");
const BaseService = require("./base.service");

// class UserService extends BaseService {
//   // static model = User;
//   static blindModel() {
//     return User;
//   }
// }

// module.exports = UserService;

class UserService {
  #model = User;
  async getUsers() {
    try {
      const users = await this.#model.findAll({
        include: "restaurants",
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    try {
      if (await User.findOne({ where: { email: data.email } })) {
        throw new AppError(400, "Email đã tồn tại!");
      }
      // trong trường hợp admin thêm user chỉ cần dùng email, ta phải tạo mật khẩu ngẫu nhiên
      if (!data.password) {
        data.password = Math.random().toString(36).substring(2);
        // Thêm bước gửi email về cho người dùng
      }
      const createdUser = await User.create(data);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, data) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError(400, "User không tồn tại!");
      } else {
        user.update(data);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      if (await User.findByPk(userId)) {
        await User.destroy({
          where: {
            id: userId,
          },
        });

        return true;
      }
      throw new AppError(400, "User không tồn tại!");
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService();

module.exports = userService;
