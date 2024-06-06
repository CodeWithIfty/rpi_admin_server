const NomineeInformation = require("../../../models").NomineeInformation;

const getNomineeInfo = async (req, res) => {
  const username = req.user.username;

  try {
    // Find the teacher with the provided phone number
    const spouse = await NomineeInformation.findOne({
      where: {
        username: username,
      },
    });

    if (spouse) {
      return res.status(200).json({ data: spouse });
    } else {
      return res.status(404).json({ message: "Nominee not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getNomineeInfo };
