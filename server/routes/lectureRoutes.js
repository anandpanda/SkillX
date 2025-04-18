const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lectureController");

// CREATE a lecture (recorded or live)
router.post("/", lectureController.createLecture);

// CONVERT a live lecture to recorded
router.patch("/convert", lectureController.convertLiveToRecorded);

module.exports = router;
