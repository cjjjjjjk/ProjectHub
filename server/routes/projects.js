const express = require("express");
const router = express.Router();
const { Projects } = require("../models");
const { upload } = require("../middleware/upload");
const { Op } = require("sequelize");

// Tạo mới project
const createProject = async (req, res) => {
  const { name, description, start_date, end_date, code, state, model } = req.body;

  if (!name || !code || !state || !model) {
    return res
      .status(400)
      .json({ error: "Vui lòng cung cấp đầy đủ name, code, state và model cho dự án." });
  }

  try {
    const newProject = await Projects.create({
      name,
      description: description || null,
      start_date: start_date || null,
      end_date: end_date || null,
      code,
      state,
      model
    });

    res.json(newProject);
  } catch (error) {
    console.error("Lỗi khi tạo dự án:", error.message);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi tạo dự án." });
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
router.get("/", getAllProjects);
router.post("/", upload.single("document"), createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
