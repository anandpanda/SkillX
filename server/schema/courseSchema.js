const mongoose = require('mongoose');

// Define the Course schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // rich text (HTML or Markdown)
  banner: { type: String }, // image URL (e.g., Cloudinary or Hygraph export)
  time: { type: String ,required:true},
  points: { type: String},
  author: { type: String ,required:true}, // could be enum or separate author model
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    required: true 
  },
  tags: [{ type: String }],
  chapters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture' // reference to the Chapter model
  }] 
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
