const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const lectureRoutes = require('./routes/lectureRoutes'); // Importing the lecture routes

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/SkillX';

// Middleware
app.use(express.json()); // Parse JSON requests

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

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Server is running');
});

// Use the lecture routes (applying the lecture route to the '/api' path)
app.use('/api', lectureRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server is running on port ${PORT}`);
});
