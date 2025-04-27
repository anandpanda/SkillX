import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";

const dummyLectureData = {
  _id: "680254ea0c1e646142fff6d5",
  title: "Intro to JSX",
  description: "What is JSX and how it works",
  duration: "20 mins",
  type: "recorded",
  videoLink:
    "https://res.cloudinary.com/your-cloud-name/video/upload/v1700000000/sample.mp4", // Replace this with your Cloudinary URL
};

const LectureContent = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{dummyLectureData.title}</Text>
        <Text style={styles.duration}>{dummyLectureData.duration}</Text>
        <Text style={styles.description}>{dummyLectureData.description}</Text>

        <View style={styles.videoContainer}>
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: ResizeMode.CONTAIN,
              source: {
                uri: dummyLectureData.videoLink, // Cloudinary video URL
              },
            }}
            style={styles.video}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Next chapter clicked");
        }}
      >
        <Text style={styles.buttonText}>Next Chapter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LectureContent;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to allow the ScrollView to take the available space
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between", // This ensures the button is pushed to the bottom
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Give some space at the bottom so the button doesn't overlap
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#2c3e50",
    textAlign: "center",
  },
  duration: {
    fontSize: 14,
    marginBottom: 12,
    color: "#7f8c8d",
    textAlign: "center",
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    color: "#34495e",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "300",
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 24,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  video: {
    width: width - 40,
    height: ((width - 40) * 9) / 16,
    borderRadius: 12,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 30, // Space at the bottom to make the button fit
    shadowColor: "#2980b9",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
