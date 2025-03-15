import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { getItem, removeItem } from "../utils/asyncStorage.js";

export default function RootLayout() {
  const [showOnboarding, setShowOnboarding] = useState<undefined | null>(
    undefined
  );

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    checkIfOnboarded();
  }, [setShowOnboarding, showOnboarding]);

  const checkIfOnboarded = async () => {
    let onboarding = await getItem("onboarded");
    if (onboarding === "1") {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  return (
    // {showOnboarding ? "onboarding" : "login"}
    <Stack initialRouteName="onboarding">
      <Stack.Screen
        name="onboarding"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
