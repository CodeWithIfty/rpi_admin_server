'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeProfessionalMembership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeProfessionalMembership.init({
    username: DataTypes.STRING,
    employee_name: DataTypes.STRING,
    employee_professional_membership_organization_name: DataTypes.STRING,
    employee_professional_membership_taken_from: DataTypes.DATE,
    employee_professional_membership_number: DataTypes.STRING,
    employee_professional_membership_date: DataTypes.DATE,
    employee_professional_membership_active_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeProfessionalMembership',
  });
  return EmployeeProfessionalMembership;
};