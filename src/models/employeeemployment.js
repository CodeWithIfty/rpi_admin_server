'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeEmployment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeEmployment.init({
    username: DataTypes.STRING,
    employee_name: DataTypes.STRING,
    employee_employment_type: DataTypes.STRING,
    employee_employment_present_basic_scale: DataTypes.STRING,
    employee_employment_select_locality: DataTypes.STRING,
    employee_employment_present_institute: DataTypes.STRING,
    employee_employment_date_of_joining: DataTypes.DATE,
    employee_employment_date_of_regularization: DataTypes.DATE,
    employee_employment_job_confirmation_no: DataTypes.STRING,
    employee_employment_date_of_confirmation: DataTypes.DATE,
    employee_employment_officer_order_no: DataTypes.STRING,
    employee_employment_officer_order_date: DataTypes.DATE,
    employee_employment_active_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeEmployment',
  });
  return EmployeeEmployment;
};