import { ScrollView, StyleSheet, View, StatusBar } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "@/app/Components/HomeScreen/Header";
import CourseList from "@/app/Components/HomeScreen/CourseList";
import api from "@/app/Services/api";
import { useFocusEffect } from "expo-router";

const Home = () => {
  const [basicCourses, setBasicCourses] = useState([]);
  const [moderateCourses, setModerateCourses] = useState([]);
  const [advancedCourses, setAdvancedCourses] = useState([]);

  // This will help in fetching new courses every time we revisit the screen
  useFocusEffect(
    useCallback(() => {
      const fetchCourses = async () => {
        try {
          const { data } = await api.get("/courses");
          setBasicCourses(
            data.filter((c) => c.level?.toLowerCase() === "beginner")
          );
          setModerateCourses(
            data.filter((c) => c.level?.toLowerCase() === "moderate")
          );
          setAdvancedCourses(
            data.filter((c) => c.level?.toLowerCase() === "advanced")
          );
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
      };
      fetchCourses();
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#6857E8" barStyle="light-content" />
      <View style={styles.headerSection}>
        <Header />
      </View>
      <View style={styles.courses}>
        <View style={styles.basicCourse}>
          <CourseList title="Basic" data={basicCourses} />
        </View>
        <CourseList title="Moderate" data={moderateCourses} />
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
