const Course = require('../schema/courseSchema');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      banner,
      time,
      points,
      author,
      level,
      tags,
      chapters
    } = req.body;

    const newCourse = new Course({
      name,
      description,
      banner,
      time,
      points,
      author,
      level,
      tags,
      chapters
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('chapters');
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate('chapters');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById
};
