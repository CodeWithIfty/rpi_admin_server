"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {}
  }
  Attendance.init(
    {
      student_id: DataTypes.STRING,
      subject_code: DataTypes.INTEGER,
      status: DataTypes.STRING,
      date: DataTypes.DATEONLY, // Use DATEONLY for date without time
      time: DataTypes.TIME, // Separate time field
      teacher_id: DataTypes.STRING,
      room_no: DataTypes.INTEGER,
      semester: DataTypes.STRING,
      shift_and_group: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "attendance",
      timestamps: false,
    }
  );
  return Attendance;
};
