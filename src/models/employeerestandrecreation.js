'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeRestAndRecreation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeRestAndRecreation.init({
    username: DataTypes.STRING,
    employee_name: DataTypes.STRING,
    employee_rest_and_recreation_eligibility_date: DataTypes.DATE,
    employee_rest_and_recreation_basic_salary: DataTypes.DECIMAL,
    employee_rest_and_recreation_total_days: DataTypes.INTEGER,
    employee_rest_and_recreation_memo_number: DataTypes.STRING,
    employee_rest_and_recreation_officer_order_date: DataTypes.DATE,
    employee_rest_and_recreation_leave_from_date: DataTypes.DATE,
    employee_rest_and_recreation_leave_to_date: DataTypes.DATE,
    employee_rest_and_recreation_reason_for_not_taken: DataTypes.STRING,
    employee_rest_and_recreation_active_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeRestAndRecreation',
  });
  return EmployeeRestAndRecreation;
};