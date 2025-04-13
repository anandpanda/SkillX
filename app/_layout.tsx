import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { getItem } from "@/utils/asyncStorage.js";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const [showOnboarding, setShowOnboarding] = useState<undefined | null>(null);

  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    checkIfOnboarded();
  }, [setShowOnboarding, showOnboarding]);

  const checkIfOnboarded = async () => {
    let onboarding = await getItem("onboarded");
    console.log(onboarding);
    if (onboarding === "1") {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
    console.log("showOnboarding value:", showOnboarding);
  };

  if (showOnboarding == null) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        {showOnboarding ? (
          <Stack
            initialRouteName="onboarding" // Corrected route
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="onboarding"></Stack.Screen>
            <Stack.Screen name="login"></Stack.Screen>
          </Stack>
        ) : (
          <>
            <SignedIn>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{ headerShown: false }}
                ></Stack.Screen>
              </Stack>
            </SignedIn>
            <SignedOut>
              <Stack initialRouteName="onboarding">
                <Stack.Screen
                  name="onboarding"
                  options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                  name="login"
                  options={{ headerShown: false }}
                ></Stack.Screen>
              </Stack>
            </SignedOut>
          </>
        )}
      </ClerkLoaded>
    </ClerkProvider>
  );
}
