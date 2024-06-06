"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NomineeInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NomineeInformation.init(
    {
      username: DataTypes.STRING,
      employee_name: DataTypes.STRING,
      nominee_name_english: DataTypes.STRING,
      nominee_name_bangla: DataTypes.STRING,
      nominee_date_of_birth: DataTypes.DATE,
      nominee_gender: DataTypes.STRING,
      nominee_relationship: DataTypes.STRING,
      nominee_organization_type: DataTypes.STRING,
      nominee_organization: DataTypes.STRING,
      nominee_occupation: DataTypes.STRING,
      nominee_designation: DataTypes.STRING,
      nominee_nid: DataTypes.STRING,
      nominee_mobile_number: DataTypes.STRING,
      nominee_address: DataTypes.STRING,
      nominee_active_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NomineeInformation",
    }
  );
  return NomineeInformation;
};
