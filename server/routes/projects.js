const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");
const { Projects, ProjectJoineds } = require("../models");
const { Op } = require("sequelize");

// Create a new project
const createProject = async (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
    code,
    model,
    accessibility,
  } = req.body;
  const userId = req.user["user"].id;

  if (!name || !code || !model) {
    return res.status(400).json({
      error: "Please provide name, code and model for the project.",
    });
  }

  try {
    const existingProject = await Projects.findOne({ where: { code } });
    if (existingProject) {
      return res.status(400).json({ error: "Project code already exists." });
    }

    const newProject = await Projects.create({
      name,
      description: description || null,
      start_date: start_date || null,
      end_date: end_date || null,
      code,
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
    res
      .status(500)
      .json({ error: "An error occurred while creating the project." });
  }
};

// Get all projects joined
const getUserJoinedProjects = async (req, res) => {
  const userId = req.user["user"].id;

  try {
    const joinedProjects = await Projects.findAll({
      include: [
        {
          model: ProjectJoineds,
          where: { participant_id: userId },
          required: true,
        },
      ],
    });

    if (joinedProjects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for this user." });
    }

    res.json(joinedProjects);
  } catch (error) {
    console.error("Error fetching joined projects:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving joined projects." });
  }
};

// Get a project of an user by ID
const getProjectsByUserId = async (req, res) => {
  const userId = req.user["user"].id;
  const projectId = parseInt(req.params.projectId, 10);

  if (isNaN(projectId) || projectId <= 0) {
    return res.status(400).json({ error: "Invalid project ID." });
  }

  try {
    const projectJoined = await Projects.findOne({
      where: {
        id: projectId,
        '$ProjectJoineds.participant_id$': userId
      },
      include: [
        {
          model: ProjectJoineds,
          where: { participant_id: userId },
          required: true,
        }
      ],
    });

    if (!projectJoined) {
      return res.status(404).json({
        message: "Project not found or user has not joined this project.",
      });
    }

    res.json(projectJoined);
  } catch (error) {
    console.error("Error fetching project:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the project." });
  }
};

// Update a project by ID
const updateProjectById = async (req, res) => {
  try {
    const userId = req.user["user"].id;
    const { projectId } = req.params;
    const { name, description, start_date, end_date, accessibility } = req.body;

    const parsedProjectId = parseInt(projectId, 10);
    const isValidId = (id) => Number.isInteger(id) && id > 0;
    if (!isValidId(parsedProjectId)) {
      return res.status(400).json({ message: "Invalid ID." });
    }

    const project = await Projects.findOne({
      where: { id: parsedProjectId },
      include: [
        {
          model: ProjectJoineds,
          where: { participant_id: userId },
          required: true,
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const { code, model } = req.body;
    if (code && code !== project.code) {
      return res.status(400).json({
        message: "You cannot change the project code.",
      });
    }
    if (model && model !== project.model) {
      return res.status(400).json({
        message: "You cannot change the project model.",
      });
    }

    const updateResult = await Projects.update(
      { name, description, start_date, end_date, accessibility },
      {
        where: { id: parsedProjectId },
      }
    );

    if (updateResult[0] === 0) {
      return res
        .status(404)
        .json({ message: "Project not found or update failed." });
    }

    const updatedProject = await Projects.findOne({
      where: { id: parsedProjectId },
    });

    res.json({
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the project." });
  }
};

// Delete a project by ID
const deleteProjectById = async (req, res) => {
  try {
    const userId = req.user["user"].id;

    const { projectId } = req.params;

    const parsedProjectId = parseInt(projectId, 10);
    const isValidId = (id) => Number.isInteger(id) && id > 0;
    if (!isValidId(parsedProjectId)) {
      return res.status(400).json({ message: "Invalid ID." });
    }

    const projectJoined = await ProjectJoineds.findOne({
      where: {
        participant_id: userId,
        project_id: parsedProjectId,
      },
    });

    if (!projectJoined) {
      return res
        .status(403)
        .json({ message: "User has not joined this project." });
    }

    if (!projectJoined.isManager) {
      return res
        .status(403)
        .json({ message: "Only project managers can delete the project." });
    }

    await Projects.destroy({
      where: { id: projectId },
    });

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
router.get("/user", validateToken, getUserJoinedProjects);
router.get("/user/:projectId", validateToken, getProjectsByUserId);
router.put("/user/:projectId", validateToken, updateProjectById);
router.delete("/user/:projectId", validateToken, deleteProjectById);

module.exports = router;
