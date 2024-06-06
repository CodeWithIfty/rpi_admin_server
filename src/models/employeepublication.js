"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeePublication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeePublication.init(
    {
      username: DataTypes.STRING,
      employee_name: DataTypes.STRING,
      employee_publication_title: DataTypes.STRING,
      employee_publication_organization_or_institute: DataTypes.STRING,
      employee_publication_type: DataTypes.STRING,
      employee_publication_link: DataTypes.STRING,
      employee_publication_date: DataTypes.DATE,
      employee_publication_remarks: DataTypes.STRING,
      employee_publication_document: DataTypes.STRING,
      employee_publication_document_name: DataTypes.STRING,
      employee_training_type: DataTypes.STRING,
      employee_publication_active_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmployeePublication",
    }
  );
  return EmployeePublication;
};
