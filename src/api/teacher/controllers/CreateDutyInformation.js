const EmployeeActingDuty = require("../../../models").EmployeeActingDuty;

const CreateDutyInformation = async (req, res) => {
  const username = req.user.username;
  try {
    const newSpouse = await EmployeeActingDuty.create({
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

module.exports = { CreateDutyInformation };
