import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Linking from "expo-linking";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";

const JitsiMeetingScreen = () => {
  const { meetingRoom, userName } = useLocalSearchParams();

  useEffect(() => {
    const openMeeting = async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: audioStatus } = await Audio.requestPermissionsAsync();

      if (cameraStatus === "granted" && audioStatus === "granted") {
        const room = Array.isArray(meetingRoom) ? meetingRoom[0] : meetingRoom;
        const name = Array.isArray(userName) ? userName[0] : userName;

        const meetingUrl = `https://meet.jit.si/${room}#userInfo.displayName=${encodeURIComponent(
          name
        )}`;
        Linking.openURL(meetingUrl);
      } else {
        Alert.alert(
          "Permissions Required",
          "Camera and microphone permissions are needed to join the meeting."
        );
      }
    };

    openMeeting();
  }, []);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default JitsiMeetingScreen;
