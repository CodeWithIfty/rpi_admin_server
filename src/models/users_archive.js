"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      password: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      rollNumber: {
        type: DataTypes.STRING,
        allowNull: false, // Disallow null values for rollNumber
      },
    },
    {
      sequelize,
      modelName: "users_archive",
      timestamps: false,
    }
  );
  return User;
};
