const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Clerk User ID

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },

    completedLectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
        },
    ],
});

const courseProgress = mongoose.model("CourseProgress", courseProgressSchema);

module.exports = courseProgress;
