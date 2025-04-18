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
