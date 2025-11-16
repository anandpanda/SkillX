import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot, Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Missing Clerk publishable key.");
}

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
    }
  },
};

export default function Layout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

// import { Stack } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { getItem } from "@/utils/asyncStorage.js";
// import {
//   ClerkProvider,
//   ClerkLoaded,
//   SignedIn,
//   SignedOut,
// } from "@clerk/clerk-expo";

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// if (!publishableKey) {
//   throw new Error(
//     "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
//   );
// }

// export default function RootLayout() {
//   const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

//   useEffect(() => {
//     checkIfOnboarded();
//   }, []); // Removed dependencies to avoid unnecessary re-renders

//   const checkIfOnboarded = async () => {
//     let onboarding = await getItem("onboarded");
//     console.log(onboarding);
//     setShowOnboarding(onboarding !== "1"); // Simplified state update
//     console.log("showOnboarding value:", onboarding !== "1");
//   };

//   if (showOnboarding == null) {
//     return null;
//   }

//   return (
//     <ClerkProvider publishableKey={publishableKey}>
//       <ClerkLoaded>
//         {showOnboarding ? (
//           <Stack
//             initialRouteName="screens/onboarding" // Corrected route
//             screenOptions={{ headerShown: false }}
//           >
//             <Stack.Screen name="screens/onboarding"></Stack.Screen>
//             <Stack.Screen name="screens/login"></Stack.Screen>
//           </Stack>
//         ) : (
//           <>
//             <SignedIn>
//               <Stack>
//                 <Stack.Screen
//                   name="(tabs)"
//                   options={{ headerShown: false }}
//                 ></Stack.Screen>
//               </Stack>
//             </SignedIn>
//             <SignedOut>
//               <Stack initialRouteName="screens/onboarding">
//                 <Stack.Screen
//                   name="screens/onboarding"
//                   options={{ headerShown: false }}
//                 ></Stack.Screen>
//                 <Stack.Screen
//                   name="screens/login"
//                   options={{ headerShown: false }}
//                 ></Stack.Screen>
//               </Stack>
//             </SignedOut>
//           </>
//         )}
//       </ClerkLoaded>
//     </ClerkProvider>
//   );
// }
