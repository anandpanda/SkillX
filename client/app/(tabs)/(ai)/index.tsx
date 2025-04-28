import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "@/app/Services/api";

const interestsList = [
  "Coding",
  "Design",
  "Business",
  "Music",
  "Marketing",
  "Photography",
  "React",
  "HTML",
];

const SurpriseScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: selecting, 2: showing results

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Fetching courses
      const response = await api.get("/courses");
      const data = response.data;

      // Simple AI Logic
      const filteredCourses = data.filter((course) => {
        const title = course.name?.toLowerCase();
        return (
          title &&
          selectedInterests.some((interest) =>
            title.includes(interest.toLowerCase())
          )
        );
      });

      setCourses(filteredCourses);
      setStep(2);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{item.name}</Text>
      <Text style={styles.courseAuthor}>by {item.author}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#7F7FD5", "#86A8E7", "#91EAE4"]}
      style={styles.container}
    >
      {step === 1 ? (
        <>
          <Text style={styles.heading}>Tell us your Interests ✨</Text>
          <Text style={styles.heading2}>and get AI recommendations</Text>
          <View style={styles.interestsContainer}>
            {interestsList.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestButton,
                  selectedInterests.includes(interest) && styles.selectedButton,
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(interest) && styles.selectedText,
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.surpriseButton}
            onPress={fetchCourses}
          >
            <Text style={styles.surpriseButtonText}>
              {loading ? "Loading..." : "Surprise Me!"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.heading}>Courses for You 🎯</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={courses}
              renderItem={renderCourse}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  heading2: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  interestButton: {
    backgroundColor: "#ffffff50",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 8,
  },
  selectedButton: {
    backgroundColor: "#fff",
  },
  interestText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedText: {
    color: "#7F7FD5",
    fontWeight: "700",
  },
  surpriseButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "center",
  },
  surpriseButtonText: {
    color: "#7F7FD5",
    fontSize: 18,
    fontWeight: "bold",
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  courseAuthor: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});

export default SurpriseScreen;
