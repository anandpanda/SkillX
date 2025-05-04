import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import CourseCard from "@/app/Components/HomeScreen/CourseCard";

const { width } = Dimensions.get("window");

const RecommendedCoursesList = ({ courses, onTryAgain }) => {
  const router = useRouter();

  // Empty state when no courses are found
  if (courses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.noCoursesText1}>Oops!!</Text>
        <Text style={styles.noCoursesText}>No matching courses found 😔</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgain}>
          <Text style={styles.tryAgainButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    // Calculate animation delay based on index
    const animationDelay = index * 150;

    return (
      <Animated.View
        style={[
          styles.courseCardContainer,
          {
            opacity: 1,
            transform: [
              {
                translateY: 0,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/pages/courseDetail`,
              params: { courseId: item._id },
            })
          }
          activeOpacity={0.8}
        >
          <CourseCard item={item} style={styles.courseCard} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AI Recommended Courses 🎯</Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.courseListContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgain}>
        <Text style={styles.tryAgainButtonText}>Try Different Interests</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  heading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  courseCardContainer: {
    marginBottom: 16,
  },
  courseCard: {
    width: width * 0.85,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
  },
  courseListContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  tryAgainButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tryAgainButtonText: {
    color: "#7F7FD5",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCoursesText1: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
  },
  noCoursesText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
});

export default RecommendedCoursesList;
