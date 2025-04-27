const Course = require("../schema/Course");
const Lecture = require("../schema/Lecture");

exports.createCourse = async (req, res) => {
    try {
        const { name, description, banner, time, points, author, level, tags } =
            req.body;

        const course = new Course({
            name,
            description,
            banner,
            time,
            points,
            author,
            level,
            tags,
        });

        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("lectures");
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCoursesByAuthor = async (req, res) => {
    try {
        const { authorName } = req.params;
        console.log(authorName);

        const courses = await Course.find({ author: authorName }).populate(
            "lectures"
        );

        if (!courses)
            return res.status(404).json({ error: "No courses found" });

        let studentsCount = 0;
        courses.forEach((course) => {
            const enrolledStudents = course.enrolledStudents || [];
            studentsCount += enrolledStudents.length;
        });

        console.log(courses);

        console.log({ data: { courses, studentsCount } });

        res.json({ courses, studentsCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate(
            "lectures"
        );
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addLectureToCourse = async (req, res) => {
    try {
        const { courseId, lectureId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: "Course not found" });

        if (!course.lectures.includes(lectureId)) {
            course.lectures.push(lectureId);
            await course.save();
        }

        res.status(200).json({ message: "Lecture added to course", course });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
