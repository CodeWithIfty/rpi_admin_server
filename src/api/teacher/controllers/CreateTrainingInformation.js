const EmployeeTraining = require("../../../models").EmployeeTraining;

const CreateTrainingInformation = async (req, res) => {
  const username = req.user.username;
  try {
    const newSpouse = await EmployeeTraining.create({
      username: username,
      ...req.body,
    });

    return res.status(201).json({
      message: "Data Inserted successfully",
      data: newSpouse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { CreateTrainingInformation };
