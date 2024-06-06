"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChildrenInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChildrenInformation.init(
    {
      employee_name: DataTypes.STRING,
      username: DataTypes.STRING,
      children_name_english: DataTypes.STRING,
      children_name_bangla: DataTypes.STRING,
      children_date_of_birth: DataTypes.DATE,
      children_gender: DataTypes.STRING,
      children_nid_birth_certificate_number: DataTypes.STRING,
      children_active_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ChildrenInformation",
    }
  );
  return ChildrenInformation;
};
