const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");
const { Projects, ProjectJoineds } = require("../models");
const { Op } = require("sequelize");

// Create a new project
const createProject = async (req, res) => {
  const { name, description, start_date, end_date, code, state, model, accessibility } = req.body;
  const userId = req.user['user'].id;

  if (!name || !code || !state || !model) {
    return res.status(400).json({
      error: "Please provide name, code, state, and model for the project.",
    });
  }

  try {
    const newProject = await Projects.create({
      name,
      description: description || null,
      start_date: start_date || null,
      end_date: end_date || null,
      code,
      state,
      model,
      accessibility: accessibility || "Private",
    });

    await ProjectJoineds.create({
      project_id: newProject.id,
      participant_id: userId,
      isManager: true,
    });

    res.status(201).json({
      message: "Project created successfully and user assigned as manager.",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(500).json({ error: "An error occurred while creating the project." });
  }
};

// Get all projects
const getProjects = async (_req, res) => {
  try {
    const projects = await Projects.findAll();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving projects." });
  }
};

// Get a project by ID
const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the project." });
  }
};

// Update a project by ID
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, start_date, end_date, code, state, model } =
    req.body;

  try {
    const project = await Projects.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    if (code && code !== project.code) {
      const codeExists = await Projects.findOne({
        where: { code, id: { [Op.ne]: id } },
      });
      if (codeExists) {
        return res
          .status(400)
          .json({ error: "Another project with this code already exists." });
      }
    }

    await project.update({
      name: name || project.name,
      description: description || project.description,
      start_date: start_date || project.start_date,
      end_date: end_date || project.end_date,
      code: code || project.code,
      state: state || project.state,
      model: model || project.model,
    });

    res.json({ message: "Project updated successfully.", project });
  } catch (error) {
    console.error("Error updating project:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the project." });
  }
};

// Delete a project by ID
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    await project.destroy();
    res.json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the project." });
  }
};

// Routes
router.post("/", validateToken, createProject);
router.get("/", validateToken, getProjects);
router.get("/:id", validateToken, getProjectById);
router.put("/:id", validateToken, updateProject);
router.delete("/:id", validateToken, deleteProject);

module.exports = router;
