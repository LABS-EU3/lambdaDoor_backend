const db = require('./dataDisplayModel');

const getJobRoles = async (req, res) => {
  try {
    const Roles = await db.JobRole();
    return res.status(200).json(Roles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getJobRoles,
};
