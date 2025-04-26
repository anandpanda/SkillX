const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },

    type: {
        type: String,
        enum: ["recorded", "live"],
        required: true,
    },

    // For recorded
    videoLink: { type: String },

    // For live
    meetingLink: { type: String },
    scheduledAt: { type: String },

    duration: { type: String },
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
