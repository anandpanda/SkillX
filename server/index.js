const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { clerkMiddleware } = require("@clerk/express");

app.use(cors());
app.use(express.json());

// Initialize Clerk middleware to handle authentication
app.use(clerkMiddleware());


const courseRoutes = require("./routes/courseRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const progressRoutes = require("./routes/progressRoutes");

app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/progress", progressRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
