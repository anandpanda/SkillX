import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import loginImage from "@/assets/images/login.png";
import googleImage from "@/assets/images/google.png";

// TypeSafety to ensure `login` is a function
interface LoginScreenProps {
  login: () => void;
}

const LoginScreen: FC<LoginScreenProps> = ({ login }) => {
  const handlePress = () => {
    if (typeof login === "function") {
      login();
    } else {
      console.error("login prop is not a function");
    }
  };
  return (
    <View style={styles.container}>
      <Image source={loginImage} style={styles.loginImage} />
      <View style={styles.colorContainer}>
        <Text style={styles.heading}>SkillX</Text>
        <Text style={styles.subHeading}>Teach.Learn.Exchange</Text>
        <TouchableOpacity style={styles.signInContainer} onPress={handlePress}>
          <Image source={googleImage} style={styles.googleImage} />
          <Text style={styles.signInText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  loginImage: {
    width: 250,
    height: 300,
    marginTop: 80,
  },
  colorContainer: {
    height: 400,
    width: "100%",
    backgroundColor: "#6857E8",
    alignItems: "center",
    borderTopRightRadius: "8%",
    borderTopLeftRadius: "8%",
  },
  heading: {
    marginTop: 30,
    color: "white",
    fontWeight: 800,
    fontSize: 45,
  },
  subHeading: {
    marginTop: 10,
    color: "#C2BAFF",
    fontWeight: 500,
    fontSize: 30,
  },
  googleImage: {
    width: 40,
    height: 40,
  },
  signInContainer: {
    width: 250,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 50,
    gap: 10,
    marginTop: 100,
  },
  signInText: {
    color: "#6857E8",
    fontWeight: 600,
    fontSize: 18,
  },
});
