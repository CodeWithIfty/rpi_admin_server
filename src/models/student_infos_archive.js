"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init(
    {
      student_name_bangla: DataTypes.STRING,
      fathers_name_bangla: DataTypes.STRING,
      mothers_name_bangla: DataTypes.STRING,
      student_name_english: DataTypes.STRING,
      fathers_name_english: DataTypes.STRING,
      mothers_name_english: DataTypes.STRING,
      student_birth_certificate_number: DataTypes.STRING,
      fathers_nid: DataTypes.STRING,
      mothers_nid: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      fathers_date_of_birth: DataTypes.DATE,
      mothers_date_of_birth: DataTypes.DATE,
      gender: DataTypes.STRING,
      student_religion: DataTypes.STRING,
      marital_status: DataTypes.STRING,
      student_mobile_number: DataTypes.STRING,
      student_email: DataTypes.STRING,
      fathers_mobile_number: DataTypes.STRING,
      mothers_mobile_number: DataTypes.STRING,
      permanent_division: DataTypes.STRING,
      permanent_district: DataTypes.STRING,
      permanent_upazila: DataTypes.STRING,
      permanent_union: DataTypes.STRING,
      permanent_post_code: DataTypes.STRING,
      permanent_village: DataTypes.STRING,
      present_division: DataTypes.STRING,
      present_district: DataTypes.STRING,
      present_upazila: DataTypes.STRING,
      present_union: DataTypes.STRING,
      present_post_code: DataTypes.STRING,
      present_village: DataTypes.STRING,
      past_education_division: DataTypes.STRING,
      past_education_district: DataTypes.STRING,
      past_education_upazila: DataTypes.STRING,
      past_education_year: DataTypes.INTEGER,
      past_education_exam_name: DataTypes.STRING,
      past_education_roll_number: DataTypes.STRING,
      past_education_registration_number: DataTypes.STRING,
      past_education_school_name: DataTypes.STRING,
      past_education_result: DataTypes.STRING,
      past_education_result_without_fourth_subject: DataTypes.STRING,
      past_education_board: DataTypes.STRING,
      past_education_group: DataTypes.STRING,
      present_education_division: DataTypes.STRING,
      present_education_district: DataTypes.STRING,
      present_education_semester: DataTypes.STRING,
      present_education_upazila: DataTypes.STRING,
      present_education_season: DataTypes.STRING,
      present_education_institute_name: DataTypes.STRING,
      present_education_department: DataTypes.STRING,
      present_education_shift: DataTypes.STRING,
      present_education_roll: DataTypes.STRING,
      present_education_registration_number: DataTypes.STRING,
      guardian_relation: DataTypes.STRING,
      guardian_name_bangla: DataTypes.STRING,
      guardian_name_english: DataTypes.STRING,
      guardian_nid: DataTypes.STRING,
      guardian_date_of_birth: DataTypes.DATE,
      guardian_mobile_number: DataTypes.STRING,
      mobile_banking: DataTypes.STRING,
      account_holder_name_english: DataTypes.STRING,
      account_holder_nid: DataTypes.STRING,
      account_number: DataTypes.STRING,
      who_bear_education_coast: DataTypes.STRING,
      is_student_ethnic: DataTypes.BOOLEAN,
      is_student_family_freedom_fighter: DataTypes.BOOLEAN,
      is_student_has_another_scholarship: DataTypes.BOOLEAN,
      is_student_physically_disabled: DataTypes.BOOLEAN,
      student_img: DataTypes.STRING,
      student_blood_group: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "student_infos_archive",
      timestamps: false,
    }
  );
  return Student;
};
