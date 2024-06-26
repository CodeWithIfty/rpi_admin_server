"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      // define association here
    }
  }
  Shift.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "shift",
      timestamps: false,
    }
  );
  return Shift;
};
