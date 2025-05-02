import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function SplashScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const logoScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate logo scale in
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Slightly longer for smoother transition

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash && isLoaded) {
      router.replace(isSignedIn ? "/(tabs)/(home)" : "/(auth)/sign-in");
    }
  }, [showSplash, isLoaded, isSignedIn]);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require("@/assets/images/logo.png")}
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        />
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
    backgroundColor: "#fff", // White background
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
