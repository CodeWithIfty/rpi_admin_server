"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeeTraining extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeTraining.init(
    {
      username: DataTypes.STRING,
      employee_name: DataTypes.STRING,
      employee_training_type: DataTypes.STRING,
      employee_training_institute_name: DataTypes.STRING,
      employee_training_course_title: DataTypes.STRING,
      employee_training_duration_from: DataTypes.DATE,
      employee_training_duration_to: DataTypes.DATE,
      employee_training_result: DataTypes.STRING,
      employee_training_office_order_no: DataTypes.STRING,
      employee_training_job_category: DataTypes.STRING,
      employee_training_country: DataTypes.STRING,
      employee_training_go_document: DataTypes.STRING,
      employee_training_go_document_name: DataTypes.STRING,
      employee_training_certificate_document: DataTypes.STRING,
      employee_training_certificate_document_name: DataTypes.STRING,
      employee_training_certificate_number: DataTypes.STRING,
      employee_training_certificate_date: DataTypes.DATE,
      employee_training_organization_type: DataTypes.STRING,
      employee_training_work_area: DataTypes.STRING,
      employee_training_active_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmployeeTraining",
    }
  );
  return EmployeeTraining;
};
