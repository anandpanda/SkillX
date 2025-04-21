const CourseProgress = require("../schema/CourseProgress");

exports.markLectureComplete = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId, lectureId } = req.body;

        let progress = await CourseProgress.findOne({
            userId,
            course: courseId,
        });

        if (!progress) {
            progress = new CourseProgress({
                userId,
                course: courseId,
                completedLectures: [lectureId],
            });
        } else {
            if (!progress.completedLectures.includes(lectureId)) {
                progress.completedLectures.push(lectureId);
            }
        }

        await progress.save();
        res.status(200).json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserProgress = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { courseId } = req.body;

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

// Check if the user is enrolled in a course
exports.checkEnrollment = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const courseId = req.params.courseId;

        const progress = await CourseProgress.findOne({
            userId,
            course: courseId,
        });

        res.json({ enrolled: !!progress }); // true if enrolled
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Enroll the user in a course
exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.auth.userId;

        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }

        // Check if the user is already enrolled
        let progress = await CourseProgress.findOne({
            userId,
            course: courseId,
        });

        if (progress) {
            return res
                .status(400)
                .json({ error: "User is already enrolled in this course" });
        }

        // Enroll the user
        progress = new CourseProgress({
            userId,
            course: courseId,
            completedLectures: [],
        });

        await progress.save();
        res.status(200).json({ message: "Enrolled successfully", progress });
    } catch (err) {
        console.error("Error enrolling:", err);
        res.status(500).json({ error: err.message });
    }
};
