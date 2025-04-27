const CourseProgress = require("../schema/CourseProgress");
const Course = require("../schema/Course");

exports.markLectureComplete = async (req, res) => {
    try {
        const { lectureId, courseId } = req.body;
        const userId = req.auth.userId;

        if (!lectureId || !courseId) {
            return res
                .status(400)
                .json({ error: "Lecture ID and Course ID are required." });
        }

        const progress = await CourseProgress.findOne({
            userId,
            course: courseId,
        });

        if (!progress) {
            return res.status(404).json({ error: "Enrollment not found." });
        }

        // Check if already completed
        if (progress.completedLectures.includes(lectureId)) {
            return res
                .status(409)
                .json({ message: "Lecture already marked as complete." });
        }

        progress.completedLectures.push(lectureId);
        await progress.save();

        res.status(200).json({ message: "Lecture marked as complete." });
    } catch (error) {
        console.error("Mark complete error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getUserProgress = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId } = req.params;

        const progress = await CourseProgress.findOne({
            userId,
            course: courseId,
        }).populate("completedLectures");

        if (!progress) {
            return res.status(200).json({ completedLectures: [] });
        }

        res.status(200).json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Enroll to a course
exports.enrollToCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.auth.userId;

        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required." });
        }

        const existingProgress = await CourseProgress.findOne({
            userId,
            course: courseId,
        });

        if (existingProgress) {
            return res.status(409).json({ message: "Already enrolled." });
        }

        const newProgress = await CourseProgress.create({
            userId,
            course: courseId,
            completedLectures: [],
        });

        // add user to course enrolledStudents
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        course.enrolledStudents.push(userId);
        await course.save();

        return res
            .status(201)
            .json({ message: "Enrolled successfully", progress: newProgress });
    } catch (error) {
        console.error("Enrollment error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.checkEnrollment = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId } = req.params;

        const progress = await CourseProgress.findOne({
            userId,
            course: courseId,
        });

        res.status(200).json({ enrolled: !!progress });
    } catch (error) {
        console.error("Check enrollment error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
