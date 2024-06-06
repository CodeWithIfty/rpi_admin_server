"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employe_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employe_info.init(
    {
      username: DataTypes.STRING,
      full_name_english: DataTypes.STRING,
      full_name_bangla: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      mobile_number: DataTypes.STRING,
      national_nid: DataTypes.STRING,
      email_address: DataTypes.STRING,
      own_district: DataTypes.STRING,
      father_name_english: DataTypes.STRING,
      father_name_bangla: DataTypes.STRING,
      father_nid: DataTypes.INTEGER,
      mother_name_english: DataTypes.STRING,
      mother_name_bangla: DataTypes.STRING,
      mother_nid: DataTypes.INTEGER,
      quota: DataTypes.STRING,
      appointment_date_go: DataTypes.DATE,
      joining_date_on_gov_service: DataTypes.DATE,
      date_of_join_current_organization: DataTypes.DATE,
      date_of_confirmation: DataTypes.DATE,
      joining_date_of_present_position: DataTypes.DATE,
      job_category: DataTypes.STRING,
      job_status: DataTypes.STRING,
      employment_status: DataTypes.STRING,
      requirement_type: DataTypes.STRING,
      employee_type: DataTypes.STRING,
      curriculum_name: DataTypes.STRING,
      section_department: DataTypes.STRING,
      grade_info: DataTypes.STRING,
      designation: DataTypes.STRING,
      encadrement: DataTypes.STRING,
      employment_type: DataTypes.STRING,
      date_of_retirement: DataTypes.DATE,
      date_of_prl: DataTypes.DATE,
      is_district_exam_given: DataTypes.STRING,
      hrmis_number: DataTypes.STRING,
      tin_number: DataTypes.STRING,
      employee_img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "employe_info",
    }
  );
  return employe_info;
};
