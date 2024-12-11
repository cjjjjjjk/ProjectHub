const express = require("express");
const router = express.Router();
const { TaskComments, Users } = require("../models");
const { validateToken } = require('../middleware/auth')

// Lấy một bình luận theo ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await TaskComments.findByPk(id);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    console.error("Error fetching comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Tạo một bình luận mới
// update:Hai ------- 
router.post("/", validateToken, async (req, res) => {
  const { task_id, comment } = req.body;
  const user_id = req.user['user'].id
  const user_name = req.user['user'].fullname
  try {
    const newComment = await TaskComments.create({
      task_id,
      user_id,
      comment,
    });
    return res.status(201).json({ ...newComment.dataValues, name: user_name });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Cập nhật một bình luận theo ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { task_id, user_id, comment } = req.body;
  try {
    const commentToUpdate = await TaskComments.findByPk(id);
    if (commentToUpdate) {
      commentToUpdate.task_id = task_id;
      commentToUpdate.user_id = user_id;
      commentToUpdate.comment = comment;
      await commentToUpdate.save();
      res.json(commentToUpdate);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    console.error("Error updating comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Xóa một bình luận theo ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const commentToDelete = await TaskComments.findByPk(id);
    if (commentToDelete) {
      await commentToDelete.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    console.error("Error deleting comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
