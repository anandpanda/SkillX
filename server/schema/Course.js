const mongoose = require("mongoose");

// Define the Course schema
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }, // rich text
    banner: { type: String }, // image URL
    time: { type: String, required: true },
    points: { type: String },

    author: { type: String, required: true }, // Clerk User ID

    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
    },

    tags: [{ type: String }],

    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
        },
    ],

    publishedAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
