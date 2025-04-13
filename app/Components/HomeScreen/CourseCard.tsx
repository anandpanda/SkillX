import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

const CourseCard = ({ item }) => {
  return (
    <View style={styles.cards}>
      <Image source={{ uri: item?.banner?.url }} style={styles.cardsImage} />
      <View>
        <Text style={[styles.courseTitle]} numberOfLines={1}>
          {item?.name}
        </Text>
      </View>
      <View style={styles.courseDetailContainer}>
        <View style={styles.chapters}>
          <Feather name="book-open" size={20} color="black" />
          <Text> {item?.chapters?.length} Chapters</Text>
        </View>
        <View style={styles.duration}>
          <Feather name="clock" size={20} color="black" />
          <Text>{item?.time}</Text>
        </View>
      </View>
      <Text style={styles.price}>{item.price == 0 ? "Free" : item?.price}</Text>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  cards: {
    padding: 10,
    borderRadius: 15,
    marginRight: 15,
    marginTop: 5,
    backgroundColor: "#ffffff",
  },
  cardsImage: {
    width: 210,
    height: 120,
    borderRadius: 15,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    width: 150,
    flexWrap: "wrap",
  },
  courseDetailContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chapters: {
    flexDirection: "row",
    gap: 3,
  },
  duration: {
    flexDirection: "row",
    gap: 3,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6857E8",
    marginTop: 5,
  },
});
