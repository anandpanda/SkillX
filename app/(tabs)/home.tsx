import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../Components/HomeScreen/Header";

const home = () => {
  return (
    <View style={styles.headerSection}>
      <Header />
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: "#6857E8",
    width: "100%",
    height: 250,
    padding: 20,
  },
});
