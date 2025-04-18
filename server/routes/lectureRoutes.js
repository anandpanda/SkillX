const express = require('express');
const router = express.Router();
const { createLecture } = require('../controllers/lectureController');

router.post('/lectures', createLecture);

module.exports = router;