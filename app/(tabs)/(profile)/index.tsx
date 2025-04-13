import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React from "react";
import { removeItem } from "@/utils/asyncStorage";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();
  async function handleReset() {
    await removeItem("onboarded");
    Alert.alert("Reset");
    router.replace("/onboarding");
  }
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
});
