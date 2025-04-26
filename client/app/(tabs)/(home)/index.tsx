import { ScrollView, StyleSheet, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/app/Components/HomeScreen/Header";
import CourseList from "@/app/Components/HomeScreen/CourseList";
import api from "@/app/Services/api";

const Home = () => {
  const [basicCourses, setBasicCourses] = useState([]);
  const [moderateCourses, setModerateCourses] = useState([]);
  const [advancedCourses, setAdvancedCourses] = useState([]);

  useEffect(() => {
    api
      .get("/courses")
      .then((response) => {
        const allCourses = response.data;
        // console.log("All courses:", allCourses);

        // Filter based on level (case-insensitive matching)
        setBasicCourses(
          allCourses.filter((course) => course.level === "Beginner")
        );
        setModerateCourses(
          allCourses.filter((course) => course.level === "Moderate")
        );
        setAdvancedCourses(
          allCourses.filter((course) => course.level === "Advanced")
        );
      })
      .catch((error) => {
        console.error("Failed to fetch courses:", error);
      });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#6857E8" barStyle="default" />
      <View style={styles.headerSection}>
        <Header />
      </View>
      <View style={styles.courses}>
        <View style={styles.basicCourse}>
          <CourseList title="Basic" data={basicCourses} />
        </View>
        <CourseList title="Moderate " data={moderateCourses} />
        <CourseList title="Advanced" data={advancedCourses} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: "#6857E8",
    width: "100%",
    height: 350,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  courses: {
    padding: 15,
  },
  basicCourse: {
    marginTop: -180,
  },
});
