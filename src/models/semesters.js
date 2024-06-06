'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class semesters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  semesters.init({
    semester_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'semesters',
  });
  return semesters;
};