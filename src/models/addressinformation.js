"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AddressInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AddressInformation.init(
    {
      employee_name: DataTypes.STRING,
      username: DataTypes.STRING,
      organization_type: DataTypes.STRING,
      institute_name: DataTypes.STRING,
      organization_name: DataTypes.STRING,
      address_type: DataTypes.STRING,
      house_number_english: DataTypes.STRING,
      road_number_english: DataTypes.STRING,
      village_name_english: DataTypes.STRING,
      post_office_english: DataTypes.STRING,
      house_number_bangla: DataTypes.STRING,
      road_number_bangla: DataTypes.STRING,
      village_name_bangla: DataTypes.STRING,
      post_office_bangla: DataTypes.STRING,
      post_code: DataTypes.STRING,
      division: DataTypes.STRING,
      district: DataTypes.STRING,
      upazila: DataTypes.STRING,
      mobile_number: DataTypes.STRING,
      address_active_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AddressInformation",
    }
  );
  return AddressInformation;
};
