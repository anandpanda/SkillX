const Lecture = require('../schema/lectureSchema');

// Create a new lecture
const createLecture = async (req, res) => {
  try {
    const {
      title,
      description,
      videoLink,
      duration
    } = req.body;

    const newLecture = new Lecture({
      title,
      description,
      videoLink,
      duration
    });

    const savedLecture = await newLecture.save();
    res.status(201).json(savedLecture);

  } catch (error) {
    console.error("Error creating lecture:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLecture
};
