import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "@/app/Services/api";
import CourseCard from "@/app/Components/HomeScreen/CourseCard";
import { useRouter } from "expo-router";

const interestsList = [
  // Technology & Development
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Data Science",
  "Machine Learning",
  "React",
  "AI",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Blockchain",

  // Design & Creativity
  "Graphic Design",
  "UI/UX",
  "3D Modeling",
  "Animation",
  "Video Editing",
  "Photography",
  "Interior Design",
  "Fashion Design",

  // Business & Marketing
  "Entrepreneurship",
  "Finance",
  "Investing",
  "Digital Marketing",
  "SEO",
  "Product Management",
  "Sales",
  "E-Commerce",

  // Academics & Science
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "Psychology",
  "History",
  "Philosophy",
  "Economics",

  // Lifestyle & Wellness
  "Fitness",
  "Yoga",
  "Meditation",
  "Nutrition",
  "Health & Wellness",
  "Cooking",
  "Travel",
  "Home Improvement",

  // Arts & Entertainment
  "Music",
  "Singing",
  "Guitar",
  "Piano",
  "Dance",
  "Acting",
  "Creative Writing",
  "Poetry",

  // Language & Communication
  "English",
  "Public Speaking",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Sign Language",
  "Writing",

  // Career & Personal Development
  "Resume Writing",
  "Interview Skills",
  "Leadership",
  "Time Management",
  "Productivity",
  "Emotional Intelligence",
  "Critical Thinking",

  // Others / Hobby & Niche
  "DIY",
  "Gardening",
  "Pet Training",
  "Gaming",
  "Bike Riding",
  "Chess",
  "Astronomy",
  "Photography",
];

const SurpriseScreen = () => {
  const router = useRouter();
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

      const filteredCourses = data.filter((course) => {
        const tags = course.tags || [];
        return tags.some((tag) =>
          selectedInterests.some(
            (interest) => tag.toLowerCase() === interest.toLowerCase()
          )
        );
      });

      console.log(filteredCourses);
      setCourses(filteredCourses);
      setStep(2);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/pages/courseDetail`,
          params: { courseId: item._id },
        })
      }
    >
      <CourseCard item={item} style={styles.courseCard} />
    </TouchableOpacity>
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
          <ScrollView
            contentContainerStyle={styles.interestsContainer}
            showsVerticalScrollIndicator={false}
          >
            {interestsList.map((interest, index) => (
              <TouchableOpacity
                key={index}
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
          </ScrollView>
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
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : courses.length === 0 ? (
            <>
              <Text style={styles.noCoursesText1}>Oops!!</Text>
              <Text style={styles.noCoursesText}>
                No matching courses found 😔
              </Text>
              <TouchableOpacity
                style={styles.tryAgainButton}
                onPress={() => {
                  setSelectedInterests([]);
                  setCourses([]);
                  setStep(1);
                }}
              >
                <Text style={styles.tryAgainButtonText}>Try Again</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.heading3}>Courses for You 🎯</Text>
              <FlatList
                data={courses}
                renderItem={renderCourse}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.courseListContainer}
                showsVerticalScrollIndicator={false}
              />
              <TouchableOpacity
                style={styles.tryAgainButton}
                onPress={() => {
                  setSelectedInterests([]);
                  setCourses([]);
                  setStep(1);
                }}
              >
                <Text style={styles.tryAgainButtonText}>Try Again</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
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
  heading3: {
    fontSize: 24,
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
    margin: 10,
  },
  surpriseButtonText: {
    color: "#7F7FD5",
    fontSize: 18,
    fontWeight: "bold",
  },
  courseCard: {
    width: Dimensions.get("screen").width * 0.79,
    height: Dimensions.get("screen").height * 0.3,
    padding: 8,
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
  courseListContainer: {
    alignItems: "center",
    gap: 10,
  },
  tryAgainButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  tryAgainButtonText: {
    color: "#7F7FD5",
    fontSize: 16,
    fontWeight: "bold",
  },
  noCoursesText1: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 230,
  },
  noCoursesText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 50,
  },
});

export default SurpriseScreen;
