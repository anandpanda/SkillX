import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import SubHeading from "@/app/Components/SubHeading";
import CourseCard from "@/app/Components/HomeScreen/CourseCard";
import { useRouter } from "expo-router";

interface CourseListProps {
  title: string;
  data: any[];
}

const CourseList: React.FC<CourseListProps> = ({ title, data }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SubHeading
        text={`${
          title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
        } Courses`}
        color={title === "Basic" ? "#ffffff" : "#000000"}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/pages/courseDetail`,
                params: { courseId: item._id },
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
