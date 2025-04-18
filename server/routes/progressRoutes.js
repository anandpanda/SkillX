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

// GET user progress for a course
router.get("/:courseId", requireAuth, progressController.getUserProgress);

module.exports = router;
