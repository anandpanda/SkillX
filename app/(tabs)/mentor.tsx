import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

// Sample Data
interface Course {
  id: string;
  title: string;
  image: string;
  students: number;
}

const runningCourses: Course[] = [
  {
    id: '1',
    title: 'Mathematics for Engineers',
    students: 50,
    image:
      'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg',
  },
  {
    id: '2',
    title: 'Business Marketing',
    students: 40,
    image:
      'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg',
  },
];

interface ScheduledCourse {
  id: string;
  title: string;
  image: string;
  time: string;
}

const scheduledClasses: ScheduledCourse[] = [
  {
    id: '1',
    title: 'Algebra Basics',
    time: '10:00 - 11:00 AM',
    image:
      'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg',
  },
  {
    id: '2',
    title: 'Digital Marketing',
    time: '2:00 - 3:00 PM',
    image:
      'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg',
  },
];

const CourseCard: React.FC<{course: Course}> = ({course}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: course.image}} style={styles.image} />
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.title}>Students Enrolled : {course.students}</Text>
    </View>
  );
};

const ScheduledCourseCard: React.FC<{course: ScheduledCourse}> = ({course}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: course.image}} style={styles.image} />
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.title}>Time : {course.time}</Text>
    </View>
  );
};

const todaySummary = {
  studentsPresent: 75,
  classesCompleted: 3,
  assignmentsDue: 2,
};

const MentorScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Hello, Prof. Ansh</Text>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, styles.color1]}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Running Courses</Text>
          </View>
          <View style={[styles.statBox, styles.color2]}>
            <Text style={styles.statNumber}>90</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={[styles.statBox, styles.color3]}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Upcoming Classes</Text>
          </View>
        </View>

        {/* Running Courses */}
        <Text style={styles.sectionTitle}>Running Courses</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.courseList}>
          {runningCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ScrollView>

        {/* Scheduled Classes */}
        <Text style={styles.sectionTitle}>Scheduled Classes</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.courseList}>
          {scheduledClasses.map(course => (
            <ScheduledCourseCard key={course.id} course={course} />
          ))}
        </ScrollView>

        {/* Today's Summary */}
        <Text style={styles.sectionTitle}>Today's Summary</Text>
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryBox, styles.color1]}>
            <Text style={styles.summaryNumber}>
              {todaySummary.studentsPresent}
            </Text>
            <Text style={styles.summaryLabel}>Students Present</Text>
          </View>
          <View style={[styles.summaryBox, styles.color2]}>
            <Text style={styles.summaryNumber}>
              {todaySummary.classesCompleted}
            </Text>
            <Text style={styles.summaryLabel}>Classes Completed</Text>
          </View>
          <View style={[styles.summaryBox, styles.color3]}>
            <Text style={styles.summaryNumber}>
              {todaySummary.assignmentsDue}
            </Text>
            <Text style={styles.summaryLabel}>Assignments Due</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  courseList: {
    padding: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  card: {
    width: 225,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginLeft: 10,
  },
  statBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    elevation: 3,
    // borderWidth: 2,
    // borderColor:'yellow',
  },
  color1: {
    backgroundColor: '#fe8181',
  },
  color2: {
    backgroundColor: '#bad012',
  },
  color3: {
    backgroundColor: '#f0db2e',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Inner text color
    textShadowColor: 'black', // Outline color
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white', // Inner text color
    textShadowColor: 'black', // Outline color
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    paddingLeft: 8,
  },
  courseCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseStudents: {
    fontSize: 14,
    color: 'gray',
  },
  scheduleCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  classSubject: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classTime: {
    fontSize: 14,
    color: 'gray',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
  },
  summaryBox: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
    elevation: 3,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Inner text color
    textShadowColor: 'black', // Outline color
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white', // Inner text color
    textShadowColor: 'black', // Outline color
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
    textAlign: 'center',
  },
});

export default MentorScreen;