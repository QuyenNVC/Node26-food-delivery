// Setup Sequelize
const { Sequelize } = require("sequelize");
const configs = require("../config");

const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect!");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();

// Khởi tạo model
const User = require("./User")(sequelize);
const Restaurant = require("./Restaurant")(sequelize);
const RestaurantLikes = require("./RestaurantLikes")(sequelize);

// Định nghĩa relationship giữa các model
// 1-n: khi dùng as thì trong câu query phải sử dụng key của as
Restaurant.belongsTo(User, { foreignKey: "userId", as: "owner" });
User.hasMany(Restaurant, { as: "restaurants", foreignKey: "userId" });

// n-n
User.belongsToMany(Restaurant, {
  through: RestaurantLikes,
  foreignKey: "userId",
  as: "restaurantLikes",
});
Restaurant.belongsToMany(User, {
  through: RestaurantLikes,
  foreignKey: "restaurantId",
  as: "userLikes",
});

sequelize.sync();
module.exports = {
  User,
  Restaurant,
  sequelize,
};
