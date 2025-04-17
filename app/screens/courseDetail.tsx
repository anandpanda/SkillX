import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams, useRouter } from "expo-router";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import ChapterSection from "../Components/CourseDetailScreen/ChapterSection";
import { enrollCourse, getUserEnrolledCourse } from "../Services";
import { useUser } from "@clerk/clerk-expo";

const courseDetail = () => {
    const router = useRouter();
    const { course } = useLocalSearchParams();
    const { user } = useUser();
    const courseData = useMemo(() => {
        return course ? JSON.parse(course as string) : null;
    }, [course]);
    const userEmail = user?.primaryEmailAddress?.emailAddress as string;

    const [userEnrolledCourse, setUserEnrolledCourse] = useState([]);

    useEffect(() => {
        if (user && courseData) {
            GetUserEnrolledCourse();
        }
    }, [user, courseData]);

    const UserEnrolledCourse = () => {
        enrollCourse(courseData.id, userEmail).then((res) => {
            console.log(res, "enrolled course successfully");
            console.log(
                courseData.id,
                userEmail,
                "enrolled course successfully"
            );
            if(res) {
                GetUserEnrolledCourse();
            }
        });
    };

    const GetUserEnrolledCourse = () => {
        getUserEnrolledCourse(courseData.id, userEmail).then((res) => {
            console.log(courseData.id, userEmail, "get enrolled course successfully");
            console.log(res, "get enrolled course successfully");

            setUserEnrolledCourse(res.userEnrolledCourses);
        });
    };

    return (
        courseData && (
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome5
                        name="arrow-circle-left"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
                <DetailSection
                    course={courseData}
                    userEnrolledCourse={userEnrolledCourse}
                    enrollCourse={() => UserEnrolledCourse()}
                />
                <ChapterSection courseList={courseData.chapters} />
            </ScrollView>
        )
    );
};

export default courseDetail;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
