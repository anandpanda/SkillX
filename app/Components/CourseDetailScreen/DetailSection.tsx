import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import OptionSection from "./OptionSection";

const DetailSection = ({ course }) => {
  const level = course?.level;
  const author = course?.author;
  return (
    <View style={styles.CourseDetailSection}>
      <Image source={{ uri: course?.banner?.url }} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{course?.name}</Text>
      <View>
        <View style={styles.opt1}>
          <OptionSection
            icon={"book-outline"}
            value={course?.chapters.length + " Chapters"}
          />
          <OptionSection icon={"time-outline"} value={course?.time} />
        </View>
        <View style={styles.opt2}>
          <OptionSection
            icon={"person-circle-outline"}
            value={author.charAt(0).toUpperCase() + author.slice(1)}
          />
          <OptionSection
            icon={"cellular"}
            value={level.charAt(0).toUpperCase() + level.slice(1)}
          />
        </View>
      </View>

      <View>
        <Text style={styles.courseTitle}>Description</Text>
        <Text style={styles.description}>{course?.description?.markdown}</Text>
      </View>
      <View style={styles.actionbtns}>
        <TouchableOpacity style={styles.enroll}>
          <Text style={styles.action_text}>Enroll For Free</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connect}>
          <Text style={styles.action_text}>Connect With Author</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailSection;

const styles = StyleSheet.create({
  CourseDetailSection: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    width: 325,
  },
  courseImage: {
    height: 190,
    width: Dimensions.get("screen").width * 0.85,
    borderRadius: 15,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  opt1: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  opt2: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  description: {
    lineHeight: 22,
    textAlign: "justify",
    flexWrap: "wrap",
  },
  actionbtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  enroll: {
    padding: 15,
    backgroundColor: "#6857E8",
    borderRadius: 12,
  },
  connect: {
    padding: 15,
    backgroundColor: "#60B5FF",
    borderRadius: 12,
  },
  action_text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
});
