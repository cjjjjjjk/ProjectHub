// middleware/checkProjectOwnership.js
const { Projects } = require("../models");

const checkProjectOwnership = async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.user.id;

  const project = await Projects.findOne({
    where: { id: projectId, userId: userId },
  });
  if (!project) {
    return res
      .status(403)
      .json({ error: "You do not have permission to access this project" });
  }
  next();
};

module.exports = checkProjectOwnership;
