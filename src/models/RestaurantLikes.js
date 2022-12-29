const { DataTypes, literal } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "RestaurantLikes",
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      restaurantId: {
        type: DataTypes.STRING(50),
        field: "restaurant_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "restaurant_likes",
      timestamps: false,
    }
  );
};
