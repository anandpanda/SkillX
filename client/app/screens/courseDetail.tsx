import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Text,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import api from "../Services/api";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import LectureSection from "../Components/CourseDetailScreen/LectureSection";

const CourseDetail = () => {
    const router = useRouter();
    const { course } = useLocalSearchParams();
    const { getToken } = useAuth();
    const { user } = useUser();

    const courseData = course ? JSON.parse(course as string) : null;
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && courseData) {
            checkEnrollment();
        }
    }, [user, courseData]);

    const checkEnrollment = async () => {
        try {
            const token = await getToken();
            const res = await api.get(`/progress/enrolled/${courseData._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsEnrolled(res.data.enrolled);
        } catch (err) {
            console.error("Error checking enrollment:", err);
        } finally {
            setLoading(false);
        }
    };

    const enrollToCourse = async () => {
        try {
            const token = await getToken();
            const res = await api.post(
                "/enroll",
                { courseId: courseData._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Enrolled successfully", res.data);
            setIsEnrolled(true);
        } catch (err) {
            console.error("Error enrolling:", err);
        }
    };

    if (loading) {
        return (
            <ScrollView style={styles.container}>
                <ActivityIndicator size="large" color="#000" />
            </ScrollView>
        );
    }

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
                    isEnrolled={isEnrolled}
                    enrollCourse={enrollToCourse}
                />
                <LectureSection courseList={courseData.lectures} />
            </ScrollView>
        )
    );
};

export default CourseDetail;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
