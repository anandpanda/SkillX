import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useRef } from "react";

const InterestTags = ({ interestsList, selectedInterests, toggleInterest }) => {
  // Create refs for animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (interest) => {
    // Animate scale effect on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Call the toggle function
    toggleInterest(interest);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.interestsContainer}
      showsVerticalScrollIndicator={false}
    >
      {interestsList.map((interest, index) => {
        const isSelected = selectedInterests.includes(interest);

        return (
          <Animated.View
            key={index}
            style={[{ transform: [{ scale: isSelected ? scaleAnim : 1 }] }]}
          >
            <TouchableOpacity
              style={[
                styles.interestButton,
                isSelected && styles.selectedButton,
              ]}
              onPress={() => handlePress(interest)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.interestText, isSelected && styles.selectedText]}
              >
                {interest}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  interestButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  selectedButton: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  interestText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  selectedText: {
    color: "#7F7FD5",
    fontWeight: "700",
  },
});

export default InterestTags;
