"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Semester extends Model {
    static associate(models) {
      // define association here
    }
  }
  Semester.init(
    {
      semester_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "semester",
      timestamps: false,
    }
  );
  return Semester;
};
