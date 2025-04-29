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
import { useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const LectureContent = () => {
    const videoRef = useRef(null);
    const { lecture } = useLocalSearchParams();
    const lectureData = JSON.parse(lecture as string);

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

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{lectureData.title}</Text>
          <Text style={styles.duration}>⏱ {lectureData.duration}</Text>
          <Text style={styles.description}>{lectureData.description}</Text>
    
          <View style={styles.centerWrap}>
            <View style={styles.videoWrapper}>
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
    
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                console.log("Next chapter clicked");
              }}
            >
              <Text style={styles.nextButtonText}>Next Chapter →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
};

export default LectureContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1e1e1e",
        marginBottom: 6,
        textAlign: "center",
    },
    duration: {
        fontSize: 14,
        color: "#888",
        textAlign: "center",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#4a4a4a",
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    videoWrapper: {
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: "#000",
        marginBottom: 30,
    },
    video: {
        width: width - 40,
        height: ((width - 40) * 9) / 16,
        alignSelf: "center",
    },
    nextButton: {
        backgroundColor: "#2563eb",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#2563eb",
        shadowOpacity: Platform.OS === "ios" ? 0.3 : 0.8,
        shadowRadius: 10,
        elevation: 6,
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});
