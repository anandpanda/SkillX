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
const LectureSection = ({ courseList }) => {
  console.log(courseList);

  const router = useRouter();
  return (
    <View style={styles.LectureContainer}>
      <Text style={styles.title}>Lectures</Text>
      {courseList.map((item, index) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/screens/LectureContent`,
              params: { lecture: JSON.stringify(item) },
            })
          }
        >
          <View style={styles.LectureListContainer} key={item?._id}>
            <View style={styles.Lecture}>
              <Text style={styles.textStyle}>{index + 1}</Text>
              <Text style={styles.textStyle}>{item?.title}</Text>
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
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    margin: 4,
  },
  Lecture: {
    flexDirection: "row",
    gap: 5,
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
    marginBottom: 2,
  },
});
