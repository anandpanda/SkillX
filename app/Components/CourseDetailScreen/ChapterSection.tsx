import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
const ChapterSection = ({ courseList }) => {
  return (
    <View style={styles.chapterContainer}>
      <Text style={styles.title}>Chapters</Text>
      {courseList.map((item, index) => (
        <View style={styles.chapterListContainer} key={item?.id}>
          <View style={styles.chapter}>
            <Text style={styles.textStyle}>{index + 1}</Text>
            <Text style={styles.textStyle}>{item?.title}</Text>
          </View>
          <Ionicons name="lock-closed" size={24} color="gray" />
        </View>
      ))}
    </View>
  );
};

export default ChapterSection;

const styles = StyleSheet.create({
  chapterContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    width: 325,
  },
  chapterListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    margin: 4,
  },
  chapter: {
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
