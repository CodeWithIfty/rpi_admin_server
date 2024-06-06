"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class spouse_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  spouse_info.init(
    {
      username: DataTypes.STRING,
      employee_name: DataTypes.STRING,
      spouse_name_english: DataTypes.STRING,
      spouse_name_bangla: DataTypes.STRING,
      spouse_date_of_birth: DataTypes.DATE,
      spouse_gender: DataTypes.STRING,
      spouse_relationship: DataTypes.STRING,
      is_spouse_nominee: DataTypes.STRING,
      spouse_occupation: DataTypes.STRING,
      spouse_organization: DataTypes.STRING,
      spouse_organization_type: DataTypes.STRING,
      spouse_work_area: DataTypes.STRING,
      spouse_designation: DataTypes.STRING,
      spouse_nid: DataTypes.STRING,
      spouse_mobile_number: DataTypes.STRING,
      spouse_address: DataTypes.STRING,
      spouse_active_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "spouse_info",
    }
  );
  return spouse_info;
};
