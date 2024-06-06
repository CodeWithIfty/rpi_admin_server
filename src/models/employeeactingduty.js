"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeeActingDuty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeActingDuty.init(
    {
      username: DataTypes.STRING,
      employee_name: DataTypes.STRING,
      employee_acting_duty_from_organization_type: DataTypes.STRING,
      employee_acting_duty_from_institute: DataTypes.STRING,
      employee_acting_duty_from_department: DataTypes.STRING,
      employee_acting_duty_from_designation: DataTypes.STRING,
      employee_acting_duty_from_date: DataTypes.DATE,
      employee_acting_duty_to_organization_type: DataTypes.STRING,
      employee_acting_duty_to_institute: DataTypes.STRING,
      employee_acting_duty_to_department: DataTypes.STRING,
      employee_acting_duty_to_designation: DataTypes.STRING,
      employee_acting_duty_to_date: DataTypes.DATE,
      employee_acting_duty_officer_order_no: DataTypes.STRING,
      employee_acting_duty_officer_order_date: DataTypes.DATE,
      employee_acting_duty_description: DataTypes.STRING,
      employee_acting_duty_comments: DataTypes.STRING,
      employee_acting_duty_go_date: DataTypes.DATE,
      employee_acting_duty_go_document: DataTypes.STRING,
      employee_acting_duty_go_document_name: DataTypes.STRING,
      employee_acting_duty_active_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmployeeActingDuty",
    }
  );
  return EmployeeActingDuty;
};
