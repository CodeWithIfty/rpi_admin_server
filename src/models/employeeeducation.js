"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeeEducation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeEducation.init(
    {
      username: DataTypes.STRING,
      employee_name: DataTypes.STRING,
      employee_education_level: DataTypes.STRING,
      employee_education_board_university: DataTypes.STRING,
      employee_education_exam_title: DataTypes.STRING,
      employee_education_group_or_subject: DataTypes.STRING,
      employee_education_certificate_serial_no: DataTypes.STRING,
      employee_education_session_year: DataTypes.STRING,
      employee_education_roll_number: DataTypes.STRING,
      employee_education_institute_name: DataTypes.STRING,
      employee_education_result: DataTypes.STRING,
      employee_education_certificate_document: DataTypes.STRING,
      employee_education_transcript_document: DataTypes.STRING,
      employee_education_testimonial_document: DataTypes.STRING,
      employee_education_active_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmployeeEducation",
    }
  );
  return EmployeeEducation;
};
