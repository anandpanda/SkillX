const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/SkillX';

// Middleware
app.use(express.json());

// Mongoose settings
mongoose.set('strictQuery', false);

// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Define a flexible schema (non-strict allows any structure)
const studentSchema = new mongoose.Schema({}, { collection: 'Courses', strict: false });
const Student = mongoose.model('Courses', studentSchema);

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Server is running');
});

// Fetch all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    console.log('📦 Students:', students);
    res.json(students);
  } catch (err) {
    console.error('❌ Error fetching students:', err);
    res.status(500).send('Error fetching students');
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
