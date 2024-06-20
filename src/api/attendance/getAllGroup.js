const { group } = require("../../models");
const getAllGroup = async (req, res) => {
  try {
    const groups = await group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};
module.exports = {
  getAllGroup,
};
