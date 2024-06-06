"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teacher_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  teacher_info.init(
    {
      teacherNameEnglish: DataTypes.STRING,
      teacherNameBangla: DataTypes.STRING,
      teacherMobileNumber: DataTypes.STRING,
      teacherDesignation: DataTypes.STRING,
      rpiJoiningDate: DataTypes.DATE,
      dateOfBirth: DataTypes.DATE,
      nidNumber: DataTypes.STRING,
      pdsNo: DataTypes.STRING,
      address: DataTypes.STRING,
      img: DataTypes.STRING,
      dept: DataTypes.STRING,
      shift: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "teacher_info",
    }
  );
  return teacher_info;
};
