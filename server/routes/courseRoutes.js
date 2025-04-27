const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// CREATE a course
router.post("/", courseController.createCourse);

// GET all courses
router.get("/", courseController.getAllCourses);

// GET courses by author
router.get("/author/:authorName", courseController.getCoursesByAuthor);

// GET a course by ID
router.get("/:id", courseController.getCourseById);

// ADD a lecture to course
router.post("/add-lecture", courseController.addLectureToCourse);

module.exports = router;
