const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// GET /api/courses (phân trang và tìm kiếm)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  try {
    const courses = await Course.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// GET /api/courses/:id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Không tìm thấy khóa học" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
