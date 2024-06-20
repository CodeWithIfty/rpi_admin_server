"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentResult extends Model {
    static associate(models) {
      // define association here
    }
  }
  StudentResult.init(
    {
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      results: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "student_result",
      timestamps: false,
    }
  );
  return StudentResult;
};
