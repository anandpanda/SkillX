import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SubHeading = ({ text, color = "#000000" }) => {
  return (
    <View>
      <Text style={[styles.subHead, { color: color }]}>{text}</Text>
    </View>
  );
};

export default SubHeading;

const styles = StyleSheet.create({
  subHead: {
    fontSize: 24,
    fontWeight: 600,
    marginTop: 15,
  },
});
