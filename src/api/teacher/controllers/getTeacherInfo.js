const employeinfo = require("../../../models").employe_info;

const getTeacherInfo = async (req, res) => {
  const mobile_number = req.user.phone_number;

  try {
    // Find the teacher with the provided phone number
    const teacher = await employeinfo.findOne({
      where: {
        mobile_number: mobile_number,
      },
    });

    if (teacher) {
      return res.status(200).json({ data: teacher });
    } else {
      return res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTeacherInfo };
