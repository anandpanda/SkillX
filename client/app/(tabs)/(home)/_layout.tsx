import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="/pages/courseDetail" />
      <Stack.Screen name="/pages/LectureContent" />
      <Stack.Screen name="/pages/jitsiMeetingScreen" />
    </Stack>
  );
};

export default StackLayout;
