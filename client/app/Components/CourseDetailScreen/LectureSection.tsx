import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

// Utility function to truncate text after a certain number of characters
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "..."; // Truncate and add ellipsis
  }
  return text;
};

const LectureSection = ({ courseList }) => {
  console.log(courseList);

  const router = useRouter();
  return (
    <View style={styles.LectureContainer}>
      <Text style={styles.title}>Lectures</Text>
      {courseList.map((item, index) => (
        <TouchableOpacity
          key={`${item?._id}-${index}`}
          onPress={() =>
            router.push({
              pathname: `/pages/LectureContent`,
              params: { lecture: JSON.stringify(item) },
            })
          }
        >
          <View style={styles.LectureListContainer}>
            <View style={styles.Lecture}>
              <Text style={styles.textStyle}>Chapter {index + 1}:</Text>
              <Text style={styles.textStyle}>
                {truncateText(item?.title, 20)}{" "}
              </Text>
            </View>
            <Ionicons name="lock-closed" size={24} color="gray" />
          </View>
        </TouchableOpacity>
      ))}
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
});
