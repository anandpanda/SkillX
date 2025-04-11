import { Link } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import _layout from "./_layout";

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: string;
  image: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Course",
    instructor: "Hitesh Choudhary",
    rating: "4.6 ⭐ (7,801)",
    image:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg",
  },
  {
    id: "2",
    title: "The Ultimate React Course 2024",
    instructor: "Jonas Schmedtmann",
    rating: "4.7 ⭐ (18,659)",
    image:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg",
  },
  {
    id: "3",
    title: "The Ultimate React Course 2024",
    instructor: "Jonas Schmedtmann",
    rating: "4.7 ⭐ (18,659)",
    image:
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg",
  },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: course.image }} style={styles.image} />
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.instructor}>{course.instructor}</Text>
      <Text style={styles.rating}>{course.rating}</Text>
    </View>
  );
};

export default function Index() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.heading, styles.courseList]}>
          Popular for Web Developers
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.courseList}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ScrollView>
        <Text style={[styles.heading, styles.courseList]}>
          Popular for Web Developers
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.courseList}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ScrollView>
        <Text style={[styles.heading, styles.courseList]}>
          Popular for Web Developers
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.courseList}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ScrollView>
        <Text style={[styles.heading, styles.courseList]}>
          Popular for Web Developers
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.courseList}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
  },
  card: {
    width: 225,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
  },
  instructor: {
    fontSize: 12,
    color: "gray",
  },
  rating: {
    fontSize: 12,
    color: "goldenrod",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  courseList: {
    padding: 8,
  },
});
