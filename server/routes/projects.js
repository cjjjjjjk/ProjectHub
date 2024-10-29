const express = require("express");
const router = express.Router();
const { Projects } = require("../models");
const { validateToken } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const { Op } = require("sequelize");

// Middleware để kiểm tra quyền sở hữu project
const checkProjectOwnership = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const projectId = req.params.id;
  const userId = req.user.id;

  try {
    const project = await Projects.findOne({
      where: { id: projectId, userId: userId },
    });

    if (!project) {
      return res
        .status(403)
        .json({ error: "You do not have permission to access this project" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Error occurred while checking ownership" });
  }
};

// Tạo mới project
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
      document: req.file ? req.file.path : null,
    });

    res.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the project" });
  }
};

// Lấy tất cả projects
const getAllProjects = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;

  try {
    const projects = await Projects.findAndCountAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      limit: limitNumber,
      offset: (pageNumber - 1) * limitNumber,
    });

    res.json({
      total: projects.count,
      projects: projects.rows,
      currentPage: pageNumber,
      totalPages: Math.ceil(projects.count / limitNumber),
    });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving projects" });
  }
};

// Cập nhật project
const updateProject = async (req, res) => {
  const { name, description } = req.body;
  const projectId = req.params.id;

  if (!name && !description) {
    return res
      .status(400)
      .json({ error: "Please provide name or description to update" });
  }

  try {
    await Projects.update({ name, description }, { where: { id: projectId } });
    res.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the project" });
  }
};

// Xóa project
const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    await Projects.destroy({ where: { id: projectId } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the project" });
  }
};

// Route
router.get("/", validateToken, getAllProjects);
router.post("/", validateToken, upload.single("document"), createProject);
router.put("/:id", validateToken, checkProjectOwnership, updateProject);
router.delete("/:id", validateToken, checkProjectOwnership, deleteProject);

module.exports = router;
