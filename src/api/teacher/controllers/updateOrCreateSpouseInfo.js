const spouseInfo = require("../../../models").spouse_info;

const updateOrCreateSpouseInfo = async (req, res) => {
  console.log(req.user);
  const username = req.user.username;
  try {
    // Find the teacher with the provided phone number
    const existingSpouse = await spouseInfo.findOne({
      where: {
        username: username,
      },
    });

    if (existingSpouse) {
      // Update existing teacher if found
      await existingSpouse.update(req.body);
      return res
        .status(200)
        .json({ message: "Spouse information updated successfully" });
    } else {
      // If teacher not found, create a new one
      const newSpouse = await spouseInfo.create({
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
  updateOrCreateSpouseInfo,
};
