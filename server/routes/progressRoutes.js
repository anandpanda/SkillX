const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const { clerkMiddleware, getAuth } = require("@clerk/express");

// Apply clerkMiddleware to check the session
router.use(clerkMiddleware());

// MARK a lecture as complete
router.post(
    "/mark-complete",
    (req, res, next) => {
        // You can check authorization here if needed, e.g., roles, permissions
        const auth = getAuth(req);
        if (!auth.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    },
    progressController.markLectureComplete
);

// GET user progress for a course
router.get(
    "/:courseId",
    (req, res, next) => {
        const auth = getAuth(req);
        if (!auth.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    },
    progressController.getUserProgress
);

// POST user enrollment in a course
router.post(
    "/enroll",
    (req, res, next) => {
        const auth = getAuth(req);
        if (!auth.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    },
    progressController.enrollInCourse
);

// Check if user is enrolled
router.get(
    "/enrolled/:courseId",
    (req, res, next) => {
        const auth = getAuth(req);
        if (!auth.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    },
    progressController.checkEnrollment
);

module.exports = router;
