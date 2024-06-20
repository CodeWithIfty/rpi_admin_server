"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {}
  }
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      department_id: DataTypes.INTEGER,
      semester_id: DataTypes.INTEGER,
      shift_id: DataTypes.INTEGER,
      group_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "class",
      timestamps: false,
    }
  );
  return Class;
};
