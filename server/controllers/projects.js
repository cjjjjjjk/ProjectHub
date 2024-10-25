// controllers/projectsController.js
const { Projects } = require("../models");
const { Op } = require("sequelize");

const getAllProjects = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "",
    startDate,
    endDate,
  } = req.query;
  const conditions = { name: { [Op.like]: `%${search}%` } };

  if (status) conditions.status = status;
  if (startDate && endDate) {
    conditions.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  try {
    const projects = await Projects.findAndCountAll({
      where: conditions,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    res.json({
      total: projects.count,
      projects: projects.rows,
      currentPage: page,
      totalPages: Math.ceil(projects.count / limit),
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving projects" });
  }
};

const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ error: "Please provide name and description for the project" });
  }

  try {
    const newProject = await Projects.create({
      name,
      description,
      userId: req.user.id,
    });
    res.json(newProject);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the project" });
  }
};

const updateProject = async (req, res) => {
  const { name, description } = req.body;
  const projectId = req.params.id;

  try {
    await Projects.update({ name, description }, { where: { id: projectId } });
    res.json({ message: "Project updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the project" });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    await Projects.destroy({ where: { id: projectId } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the project" });
  }
};

const getProjectDetails = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Projects.findOne({ where: { id: projectId } });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the project" });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectDetails,
};
