const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const requireAuth = require("../middleware/requireAuth");

// MARK a lecture as complete
router.post(
    "/mark-complete",
    requireAuth,
    progressController.markLectureComplete
);

// GET user progress for a course (courseId is in the params)
router.get("/:courseId", requireAuth, progressController.getUserProgress);

// Enroll to a course
router.post("/enroll", requireAuth, progressController.enrollToCourse);

// CHECK enrollment
router.get(
    "/enrolled/:courseId",
    requireAuth,
    progressController.checkEnrollment
);

module.exports = router;
