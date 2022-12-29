const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());
const port = 4000;

// Kết nối tới database
const sequelize = new Sequelize({
  database: "node26-food",
  username: "root",
  password: "123456aA@",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

// Kiểm tra kết nối
sequelize
  .authenticate()
  .then(() => {
    console.log("Connect!");
  })
  .catch((error) => {
    console.log("Connect failed!", error);
    throw error;
  });

// Tạo model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(50),
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

sequelize.sync();

app.get("/api/v1/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error });
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
