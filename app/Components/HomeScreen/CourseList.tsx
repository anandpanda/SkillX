import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import getCourseList from "@/app/Services";
import SubHeading from "../SubHeading";
import Feather from "@expo/vector-icons/Feather";

interface CourseListProps {
  level: string;
}

const CourseList: React.FC<CourseListProps> = ({ level }) => {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getCourseList(level).then((data) => {
      console.log("Resp : ", data);
      setCourseList(data?.courses);
    });
  };

  return (
    <View>
      <SubHeading
        text={
          `${level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()}` +
          " Courses"
        }
        color={level == "basic" ? "#ffffff" : "#000000"}
      />
      <FlatList
        data={courseList}
        key={courseList?.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cards}>
            <Image
              source={{ uri: item?.banner?.url }}
              style={styles.cardsImage}
            />
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
            <Text style={styles.price}>
              {item.price == 0 ? "Free" : item?.price}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CourseList;

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
