import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="/screens/courseDetail" />
      <Stack.Screen name="/screens/LectureContent" />
    </Stack>
  );
};

export default StackLayout;
