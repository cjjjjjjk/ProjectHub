const express = require("express");
const router = express.Router();
const { Reports,Tasks,Projects,Users} = require("../models");
const { validateToken } = require("../middleware/auth");

// Lấy danh sách tất cả các báo cáo
router.get("/", async (req, res) => {
  try {
    const reports = await Reports.findAll();
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get reports list by task id
router.get(`/get-reports`, async (req, res) => {
  const { task_id } = req.query
  try {
    const reports = await Reports.findAll({ where: { task_id } })
    return res.json({ success: true, reports })
  } catch (err) {
    return res.json({ success: false, reports: [], Err_message: err })
  }
})
// Create new Report  ==================== author: Hai
router.post("/create", validateToken, async (req, res) => {
  const user_id = req.user['user'].id
  const { task_id, description, attachment, label } = req.body;
  try {
    const newReport = await Reports.create({
      task_id,
      user_id,
      description,
      attachment, label,
    });
    res.status(201).json(newReport);
  } catch (error) {
    console.error("Error creating report: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/allReport", validateToken,async (req, res) => {
  const { project_id } = req.query;
  const reports = await Reports.findAll({
    include: [
      {
        model: Tasks,
        attributes: [], // Exclude Task fields
        required: true,
        include: [
          {
            model: Projects,
            attributes: [], // Exclude Project fields
            required: true,
            where: { id: project_id }, // Filter by project_id
          },
        ],
      },
      {
        model: Users, // Include Users table
        required: true, // Ensures the join happens on Reports.user_id
      },
    ],
    attributes: ['id', 'description', 'label', 'attachment'], // Only select fields from Reports
  });
  res.json(reports);

});

// Xóa một báo cáo theo ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Reports.findByPk(id);
    if (report) {
      await report.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  } catch (error) {
    console.error("Error deleting report: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
