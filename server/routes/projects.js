// routes/projects.js
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectDetails,
} = require("../controllers/projects");
const checkProjectOwnership = require("../middleware/checkProjectOwnership");
const { upload } = require("../middleware/upload");

// GET: Lấy tất cả projects
router.get("/", validateToken, getAllProjects);

// POST: Tạo mới project
router.post("/", validateToken, upload.single("document"), createProject);

// GET: Lấy thông tin chi tiết của một dự án
router.get("/:id", validateToken, getProjectDetails);

// PUT: Cập nhật project (chỉ khi user sở hữu project đó)
router.put("/:id", validateToken, checkProjectOwnership, updateProject);

// DELETE: Xóa project (chỉ khi user sở hữu project đó)
router.delete("/:id", validateToken, checkProjectOwnership, deleteProject);

module.exports = router;
