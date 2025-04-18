const Lecture = require("../schema/Lecture");

exports.createLecture = async (req, res) => {
    try {
        const {
            title,
            description,
            type,
            videoLink,
            meetingLink,
            scheduledAt,
            duration,
        } = req.body;

        const lecture = new Lecture({
            title,
            description,
            type,
            videoLink,
            meetingLink,
            scheduledAt,
            duration,
        });

        await lecture.save();
        res.status(201).json(lecture);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.convertLiveToRecorded = async (req, res) => {
    try {
        const { lectureId, videoLink } = req.body;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture)
            return res.status(404).json({ error: "Lecture not found" });

        lecture.type = "recorded";
        lecture.videoLink = videoLink;
        lecture.meetingLink = undefined;
        lecture.scheduledAt = undefined;

        await lecture.save();

        res.status(200).json({
            message: "Converted to recorded lecture",
            lecture,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
