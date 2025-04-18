import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getCourseList } from "@/app/Services";
import SubHeading from "@/app/Components/SubHeading";
import CourseCard from "@/app/Components/HomeScreen/CourseCard";
import { useRouter } from "expo-router";

interface CourseListProps {
  level: string;
}

const CourseList: React.FC<CourseListProps> = ({ level }) => {
  const router = useRouter();
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getCourseList(level).then((data) => {
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
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/screens/courseDetail`,
                params: { course: JSON.stringify(item) }, //Complex data objects are always passed like this and parsed at destination
              })
            }
          >
            <CourseCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({});
