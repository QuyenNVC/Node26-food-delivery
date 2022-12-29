const { DataTypes, STRING } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  return sequelize.define(
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
        validate: {
          isEmail: {
            msg: "Invalid Email!",
          },
          // Có thể đặt bất ký tên gì isLastName
          customValidator: (value) => {
            // Logic validation
            // Nếu không thỏa mãn
            // throw new Error("message")
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate :{
        //   isMatchedConfirmPassword: (value) => {
        //     // this ở đây để trỏ tới các cột đã định nghĩa
        //     if(value !== this.confirmPassword) {
        //       throw new Error("confirm password not match")
        //     }
        //   }
        // }

        set(value) {
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);
          // password ở đây là tên property chứ không phải tên cột
          this.setDataValue("password", hashedPassword);
        },
      },
      role: {
        type: DataTypes.ENUM("user", "merchant", "admin"),
        defaultValue: "user",
      },
      avatar: {
        type: STRING,
      },
    },
    {
      tableName: "users",
      timestamps: false,
      // Scope khi tìm kiếm, query
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      // Các phương thức được tự động chạy sau một sự kiện (create, update, delete)
      hooks: {
        // Xóa property password sau khi tạo, cập nhật user thành công trước khi trả ra record
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
