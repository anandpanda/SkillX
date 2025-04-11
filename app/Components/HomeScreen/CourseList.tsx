import { View, Text } from "react-native";
import React, { useEffect } from "react";
import getCourseList from "@/app/Services";

interface CourseListProps {
    level: string;
}

const CourseList: React.FC<CourseListProps> = ({ level }) => {
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = () => {
        getCourseList(level).then((data) => {
            console.log("Resp : ", data);
        });
    };

    return (
        <View>
            <Text>CourseList</Text>
        </View>
    );
};

export default CourseList;
