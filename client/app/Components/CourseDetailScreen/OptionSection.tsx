import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const OptionSection = ({ icon, value }) => {
  return (
    <View style={styles.lectures}>
      <Ionicons name={icon} size={20} color="black" />
      <Text>{value}</Text>
    </View>
  );
};

export default OptionSection;

const styles = StyleSheet.create({
  lectures: {
    flexDirection: "row",
    gap: 3,
  },
});
