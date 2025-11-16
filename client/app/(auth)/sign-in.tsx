import React, { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useSSO } from "@clerk/clerk-expo";
import LoginScreen from "@/app/pages/login";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  const router = useRouter();
  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      const redirectUrl = Linking.createURL("oauth-native-callback");
      console.log("OAuth Redirect URL:", redirectUrl);

      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: redirectUrl,
        });

      console.log("Created Session ID:", createdSessionId);

      // If sign in was successful, set the active session
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        console.log("Session activated, navigating to home");
        router.replace("/(tabs)/(home)");
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
        console.log("No session created - may need additional steps");
        Alert.alert(
          "Authentication Issue",
          "Could not complete sign in. Please try again."
        );
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("OAuth Error:", JSON.stringify(err, null, 2));
      Alert.alert(
        "Sign In Error",
        `Failed to sign in: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  }, []);

  return <LoginScreen login={onPress} />;
}
