import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import SubHeading from "@/app/Components/SubHeading";
import CourseCard from "@/app/Components/HomeScreen/CourseCard";
import { useRouter } from "expo-router";

interface CourseListProps {
  title: string;
  data: any[]; // Adjust the type as per your data structure
}

const CourseList: React.FC<CourseListProps> = ({ title, data }) => {
  const router = useRouter();
  return (
    <View>
      <SubHeading
        text={
          `${title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}` +
          " Courses"
        }
        color={title == "basic" ? "#ffffff" : "#000000"}
      />
      <FlatList
        data={data}
        key={data?._id}
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
