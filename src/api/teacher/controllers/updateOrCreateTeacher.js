const teacherInfo = require("../../../models").employe_info;

const updateOrCreateTeacher = async (req, res) => {
  const mobile_number = req.user.phone_number;

  try {
    // Find the teacher with the provided phone number
    const existingTeacher = await teacherInfo.findOne({
      where: {
        mobile_number: mobile_number,
      },
    });

    if (existingTeacher) {
      // Update existing teacher if found
      await existingTeacher.update(req.body);
      return res
        .status(200)
        .json({ message: "Teacher information updated successfully" });
    } else {
      // If teacher not found, create a new one
      const newTeacher = await teacherInfo.create({
        mobile_number: mobile_number,
        ...req.body,
      });

      return res.status(201).json({
        message: "New teacher created successfully",
        data: newTeacher,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  updateOrCreateTeacher,
};
