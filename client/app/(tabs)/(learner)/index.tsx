import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import CourseList from "@/app/Components/HomeScreen/CourseList";
import api from "@/app/Services/api";

const LearnerScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      const enrolledCourses = data.filter((item) =>
        item.enrolledStudents.includes(user?.id)
      );
      setCourses(enrolledCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <ScrollView style={styles.wrapper}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.helloText}>Welcome back,</Text>
          <Text style={styles.nameText}>{user?.fullName}</Text>
        </View>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
      </View>

      {/* Motivational Quote */}
      <Text style={styles.motivation}>
        🚀 “Keep learning — your future self will thank you.”
      </Text>

      {/* Courses Overview Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="book-outline" size={24} color="#F4A261" />
          <Text style={styles.cardTitle}>Courses Enrolled</Text>
        </View>
        <Text style={styles.courseCount}>{courses.length}</Text>
      </View>

      {/* Courses List */}
      <Text style={styles.sectionTitle}>Your Learning</Text>
      <View style={styles.courseListContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#F4A261" />
        ) : (
          <CourseList title="Enrolled Courses" data={courses} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F8F9FA",
    flex: 1,
  },
  header: {
    backgroundColor: "#6857E8",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  helloText: {
    color: "#fff",
    fontSize: 16,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  motivation: {
    fontSize: 14,
    fontStyle: "italic",
    marginHorizontal: 20,
    marginVertical: 40,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  courseCount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6857E8",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 2,
    color: "#333",
  },
  courseListContainer: {
    marginLeft: 15,
  },
});

export default LearnerScreen;
