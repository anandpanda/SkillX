import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="onboardingScreen">
      {/* tabs will be shown once user is logged in */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>

      {/* Initially onboarding screen is presented */}
      <Stack.Screen
        name="onboardingScreen"
        options={{ headerShown: false }}
      ></Stack.Screen>
      {/* Once skip or done is pressed user moves to login screen */}
      <Stack.Screen
        name="loginScreen"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
