import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function SplashScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash && isLoaded) {
      if (isSignedIn) {
        router.replace("/(tabs)/(home)");
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [showSplash, isLoaded, isSignedIn]);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>SkillX</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  appName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});
