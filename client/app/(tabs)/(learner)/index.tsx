import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import api from "@/app/Services/api";
import CourseList from "@/app/Components/HomeScreen/CourseList";
import { useUser } from "@clerk/clerk-expo";




const LearnerScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  

  const fetchCourses = async () => {
    try {
      const { data } =  await api.get("/courses");
      const enrolledCourses = data.filter((item) =>
        item.enrolledStudents.includes(user?.id)
      ); 
      console.log(enrolledCourses);
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
    <ScrollView>
      <View style={styles.container}>
        {/* Main Course Section */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello,{user?.fullName} </Text>
        </View>
        <View style={styles.courseContainer}>
          <Text style={styles.sectionTitle}>Your main course</Text>
          <View style={styles.mainCourseBox}>
            <Text style={styles.courseTitle}>Marketing in B2B</Text>
            <Text style={styles.progressText}>Progress 65%</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: "65%" }]} />
            </View>
          </View>
        </View>

        {/* Upcoming Classes */}
        <Text style={styles.sectionTitle}></Text>
        {loading ? (
          <ActivityIndicator size="large" color="#F4A261" />
        ) : (
          <CourseList title="Enrolled" data={courses}/>   
        )}

        {/* View Schedule Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View the schedule</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECECEB",
    padding: 20,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  helloText: {
    margin: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  courseContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  mainCourseBox: {
    padding: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressText: {
    fontSize: 14,
    marginVertical: 5,
  },
  progressBarContainer: {
    height: 8,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#F4A261",
  },
  classCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 10,
    marginRight: 20,
    width: 225,
    shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // overflow: 'hidden',
    elevation: 3,
  },
  classImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  classTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  classDate: {
    fontSize: 12,
    color: "gray",
  },
  classTime: {
    fontSize: 12,
    color: "#F4A261",
  },
  classProgress: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#F4A261",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LearnerScreen;
