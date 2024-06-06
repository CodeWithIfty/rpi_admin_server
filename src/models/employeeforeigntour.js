'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeForeignTour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeForeignTour.init({
    username: DataTypes.STRING,
    employee_name: DataTypes.STRING,
    employee_job_category: DataTypes.STRING,
    employee_foreign_tour_country_name: DataTypes.STRING,
    employee_foreign_tour_purpose: DataTypes.STRING,
    employee_foreign_tour_from_date: DataTypes.DATE,
    employee_foreign_tour_to_date: DataTypes.DATE,
    employee_foreign_tour_officer_order_date: DataTypes.DATE,
    employee_foreign_tour_officer_order_number: DataTypes.STRING,
    employee_foreign_tour_source_of_fund: DataTypes.STRING,
    employee_foreign_tour_go_number: DataTypes.STRING,
    employee_foreign_tour_go_date: DataTypes.DATE,
    employee_foreign_tour_go_document: DataTypes.STRING,
    employee_foreign_tour_go_document_name: DataTypes.STRING,
    employee_foreign_tour_active_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmployeeForeignTour',
  });
  return EmployeeForeignTour;
};