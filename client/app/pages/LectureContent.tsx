import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useLocalSearchParams, useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const LectureContent = () => {
  const router = useRouter();
  const videoRef = useRef(null);
  const { lectureIndex, courseList } = useLocalSearchParams();
  const parsedCourseList = JSON.parse(courseList as string);
  const currentIndex = parseInt(lectureIndex as string);
  const lectureData = parsedCourseList[currentIndex];

  const handleFullscreenUpdate = async (event) => {
    if (event.fullscreenUpdate === 1) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else if (event.fullscreenUpdate === 3) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < parsedCourseList.length) {
      router.push({
        pathname: `/pages/LectureContent`,
        params: {
          lectureIndex: (currentIndex + 1).toString(),
          courseList: JSON.stringify(parsedCourseList),
        },
      });
    } else {
      alert("🎉 You've reached the last chapter!");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{lectureData.title}</Text>
        <Text style={styles.duration}>⏱ {lectureData.duration}</Text>

        <View style={styles.card}>
          <Video
            ref={videoRef}
            source={{ uri: lectureData.videoLink }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            style={styles.video}
            shouldPlay
            onFullscreenUpdate={handleFullscreenUpdate}
          />
        </View>

        <Text style={styles.description}>{lectureData.description}</Text>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>Next Lecture →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LectureContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 6,
  },
  duration: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.2 : 0.7,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    overflow: "hidden",
    marginBottom: 30,
  },
  video: {
    width: width - 40,
    height: ((width - 40) * 9) / 16,
    alignSelf: "center",
  },
  nextButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563eb",
    shadowOpacity: Platform.OS === "ios" ? 0.4 : 0.9,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
    marginHorizontal: 20,
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
});
