const EmployeeEmployment = require("../../../models").EmployeeEmployment;

const CreateEmploymentInformation = async (req, res) => {
  const username = req.user.username;
  try {
    const newSpouse = await EmployeeEmployment.create({
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

module.exports = { CreateEmploymentInformation };
