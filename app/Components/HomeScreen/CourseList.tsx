import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import getCourseList from "@/app/Services";
import SubHeading from "../SubHeading";
import CourseCard from "./CourseCard";

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
      // console.log("Resp : ", data);
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
        renderItem={({ item }) => <CourseCard item={item} />}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({});
