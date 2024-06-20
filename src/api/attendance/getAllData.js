const { group, semester, department, shift, room } = require("../../models");

const getAllData = async (req, res) => {
  try {
    const [groups, semesters, departments, shifts, rooms] = await Promise.all([
      group.findAll(),
      semester.findAll(),
      department.findAll(),
      shift.findAll(),
      room.findAll(),
    ]);

    res.status(200).json({ groups, semesters, departments, shifts, rooms });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  getAllData,
};
