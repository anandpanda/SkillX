import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams, useRouter } from "expo-router";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import ChapterSection from "../Components/CourseDetailScreen/ChapterSection";

const courseDetail = () => {
  const router = useRouter();
  const { course } = useLocalSearchParams();
  const courseData = course ? JSON.parse(course as string) : null;
  // useEffect(() => {
  //   console.log(courseData);
  // }, []);

  return (
    courseData && (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-circle-left" size={30} color="black" />
        </TouchableOpacity>
        <DetailSection course={courseData} />
        <ChapterSection courseList={courseData.chapters} />
      </ScrollView>
    )
  );
};

export default courseDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
