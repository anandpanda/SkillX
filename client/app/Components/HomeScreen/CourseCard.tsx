import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

interface CourseCardProps {
  item: {
    _id: string;
    name: string;
    banner: string;
    lectures: any[];
    time: string;
    points: number;
  };
  style?: any;
}

const CourseCard: React.FC<CourseCardProps> = ({ item, style }) => {
  const lectureCount = Array.isArray(item?.lectures) ? item.lectures.length : 0;
  const bannerUri = item?.banner || "https://via.placeholder.com/600x300";
  
  return (
    <View style={[styles.card, style]}>
      <Image source={{ uri: bannerUri }} style={styles.cardImage} />
      <Text style={styles.courseTitle} numberOfLines={1}>
        {item?.name || "Untitled Course"}
      </Text>
      <View style={styles.courseDetail}>
        <View style={styles.detailItem}>
          <Feather name="book-open" size={18} color="black" />
          <Text> {lectureCount} Lectures</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="clock" size={18} color="black" />
          <Text>{item?.time || "—"}</Text>
        </View>
      </View>
      <Text style={styles.price}>
        {item?.points === 0 ? "Free" : `${item?.points ?? 0} Points`}
      </Text>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginRight: 15,
    width: 210,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  courseDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  price: {
    marginTop: 5,
    color: "#6857E8",
    fontWeight: "bold",
  },
});
