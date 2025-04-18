const mongoose = require('mongoose');

// Define the Chapter sub-schema
const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoLink: { type: String }, 
  duration: { type: String },
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;