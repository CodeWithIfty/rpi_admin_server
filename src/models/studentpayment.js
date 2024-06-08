const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class StudentPayment extends Model {
    static associate(models) {
      // Define association with Admission model
      StudentPayment.belongsTo(models.Admission, { foreignKey: "admissionId" });
      StudentPayment.belongsTo(models.student_info, {
        foreignKey: "studentId",
        targetKey: "present_education_roll", // targetKey matches present_education_roll
      });
    }
  }
  StudentPayment.init(
    {
      studentId: DataTypes.STRING, // Should match present_education_roll in student_info
      admissionId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      status: { type: DataTypes.BOOLEAN, defaultValue: false },
      transactionId: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      payment_method: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudentPayment",
    }
  );
  return StudentPayment;
};
