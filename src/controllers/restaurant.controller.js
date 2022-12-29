const { response } = require("../helpers/response");
const restaurantSerivce = require("../services/restaurants.service");

const getRestaurants = () => {
  return async (req, res, next) => {
    try {
      const restaurants = await restaurantSerivce.getRestaurants();
      res.status(200).json(response(restaurants));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

const likeRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      // const { userId } = req.body;
      const { user } = res.locals;
      await restaurantSerivce.likeRestaurant(user.id, restaurantId);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

const createRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const data = req.body;
      data.userId = user.id;

      const restaurant = await restaurantSerivce.createRestaurant(data);
      res.status(200).json(response(restaurant));
    } catch (error) {
      next(error);
    }
  };
};

const deleteRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { id } = req.params;

      await restaurantSerivce.deleteRestaurant(id, user);
      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};
module.exports = {
  getRestaurants,
  likeRestaurant,
  createRestaurant,
  deleteRestaurant,
};
