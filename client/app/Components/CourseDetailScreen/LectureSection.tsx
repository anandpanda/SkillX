import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

// Utility function to truncate text after a certain number of characters
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "..."; // Truncate and add ellipsis
  }
  return text;
};

const LectureSection = ({ courseList, enrolledStatus }) => {
  const router = useRouter();
  const [visitedLectures, setVisitedLectures] = useState([]);

  return (
    <View style={styles.LectureContainer}>
      <Text style={styles.title}>Lectures</Text>
      {courseList.map((item, index) => {
        const isVisited = visitedLectures.includes(index);
        return (
          <TouchableOpacity
            key={`${item?._id}-${index}`}
            onPress={() => {
              if (enrolledStatus) {
                if (!visitedLectures.includes(index)) {
                  setVisitedLectures((prev) => [...prev, index]);
                }
                router.push({
                  pathname: `/pages/LectureContent`,
                  params: {
                    courseList: JSON.stringify(courseList),
                    lectureIndex: index.toString(),
                  },
                });
              }
            }}
            disabled={!enrolledStatus}
            style={[
              styles.LectureListContainer,
              !enrolledStatus && { opacity: 0.6 }, // Dimmed appearance if not enrolled
              isVisited && styles.visitedLecture,
            ]}
          >
            <View style={styles.Lecture}>
              <Text style={styles.textStyle}>Chapter {index + 1}:</Text>
              <Text style={styles.textStyle}>
                {truncateText(item?.title, 20)}{" "}
              </Text>
            </View>
            {enrolledStatus ? (
              <AntDesign name="play" size={24} color="black" />
            ) : (
              <Ionicons name="lock-closed" size={24} color="gray" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default LectureSection;

const styles = StyleSheet.create({
  LectureContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    width: Dimensions.get("screen").width * 0.9,
  },
  LectureListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginBottom: 8,
  },
  Lecture: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 10,
  },
  visitedLecture: {
    backgroundColor: "rgba(28, 224, 28, 0.2)",
  },
});
