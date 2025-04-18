const express = require("express");
const router = express.Router();
const { createLecture } = require("../controllers/lectureController");

// const { withAuth } = require('@clerk/clerk-sdk-node');
// // example
// router.post('/mark-complete', withAuth(), markLectureComplete);

router.post("/lectures", createLecture);

module.exports = router;
