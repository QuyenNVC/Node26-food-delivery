const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const getRestaurants = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        // Lấy User chủ của nhà hàng
        "owner",
        {
          association: "userLikes",
          attributes: {
            exclude: ["email", "password"],
          },
          through: {
            // lấy những dữ liệu nào từ bảng phụ
            attributes: [],
          },
        },
      ],
    });
    return restaurants;
  } catch (error) {
    throw error;
  }
};

const createRestaurant = async (data) => {
  try {
    const restaurant = await Restaurant.create(data);
    return restaurant;
  } catch (error) {
    throw error;
  }
};

const likeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Restaurant not found");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }
    console.log(restaurant.__proto__);
    // Khi thiết lập realationships cho các model mặc định sequelize sẽ tạo ra các phương thức cho các model để tương tác với các model khac

    const hasLiked = await restaurant.hasUserLike(user.id);
    if (hasLiked) {
      await restaurant.removeUserLike(user.id);
    } else {
      await restaurant.addUserLike(user.id);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// requester: chứa thông tin user thực hiện request này
const deleteRestaurant = async (restaurantId, requester) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (restaurant) {
      throw new AppError(400, "Restaurant not  found!");
    }

    if (restaurant.userId !== requester.id) {
      throw new AppError(400, "Unauthorized!");
    }

    await Restaurant.destroy({
      where: {
        id: restaurantId,
      },
    });
  } catch (error) {}
};

module.exports = {
  getRestaurants,
  likeRestaurant,
  createRestaurant,
  deleteRestaurant,
};
