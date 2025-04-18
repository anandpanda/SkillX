const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  //  We will unlock all those chapters under this course  
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // One-way reference
  completedLecture: [{
    type:  mongoose.Schema.Types.ObjectId, 
    ref: 'Lecture' ,
  }]
});

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

module.exports = CourseProgress;
