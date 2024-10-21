const express = require("express");
const router = express.Router();
const { Projects } = require("../models");
const { validateToken } = require("../middleware/auth");

router.get("/", validateToken, async (req, res) => {
  try {
    const projects = await Projects.findAll();
    res.json(projects);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Có lỗi xảy ra trong quá trình lấy dữ liệu" });
  }
});

router.get("/:id", validateToken, async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Projects.findByPk(projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Dự án không tồn tại" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Có lỗi xảy ra trong quá trình lấy dữ liệu" });
  }
});

router.post("/", validateToken, async (req, res) => {
  const { name, description, deadline } = req.body;
  try {
    const newProject = await Projects.create({ name, description, deadline });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Có lỗi xảy ra trong quá trình tạo dự án" });
  }
});

router.put("/:id", validateToken, async (req, res) => {
  const projectId = req.params.id;
  const { name, description, deadline } = req.body;
  try {
    const project = await Projects.findByPk(projectId);
    if (project) {
      project.name = name;
      project.description = description;
      project.deadline = deadline;
      await project.save();
      res.json(project);
    } else {
      res.status(404).json({ error: "Dự án không tồn tại" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Có lỗi xảy ra trong quá trình cập nhật dự án" });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const projectId = req.params.id;
  try {
    const deletedProject = await Projects.destroy({ where: { id: projectId } });
    if (deletedProject) {
      res.json({ message: "Dự án đã được xóa thành công" });
    } else {
      res.status(404).json({ error: "Dự án không tồn tại" });
    }
  } catch (err) {
    res.status(500).json({ error: "Có lỗi xảy ra trong quá trình xóa dự án" });
  }
});

module.exports = router;
