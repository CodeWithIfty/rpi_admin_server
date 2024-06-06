'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeAward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeAward.init({
    username: DataTypes.STRING,
    employee_name: DataTypes.STRING,
    employee_award_name: DataTypes.STRING,
    employee_award_certificate_number: DataTypes.STRING,
    employee_award_area: DataTypes.STRING,
    employee_award_date: DataTypes.DATE,
    employee_award_remark: DataTypes.STRING,
    employee_award_go_order_document: DataTypes.STRING,
    employee_award_go_document_name: DataTypes.STRING,
    employee_award_active_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeAward',
  });
  return EmployeeAward;
};