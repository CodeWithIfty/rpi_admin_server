const NomineeInformation = require("../../../models").NomineeInformation;

const updateOrCreateNomineeInfo = async (req, res) => {
  console.log(req.body);
  const username = req.user.username;
  try {
    // Find the teacher with the provided phone number
    const existingSpouse = await NomineeInformation.findOne({
      where: {
        username: username,
      },
    });

    if (existingSpouse) {
      // Update existing teacher if found
      await existingSpouse.update(req.body);
      return res
        .status(200)
        .json({ message: "Nominee information updated successfully" });
    } else {
      // If teacher not found, create a new one
      const newSpouse = await NomineeInformation.create({
        username: username,
        ...req.body,
      });

      return res.status(201).json({
        message: "Data Inserted successfully",
        data: newSpouse,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  updateOrCreateNomineeInfo,
};
