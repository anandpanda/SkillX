import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter, useLocalSearchParams } from "expo-router";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import LectureSection from "../Components/CourseDetailScreen/LectureSection";
import api from "../Services/api";
import { useAuth } from "@clerk/clerk-expo";

const CourseDetail = () => {
    const router = useRouter();
    const { courseId } = useLocalSearchParams();
    const { getToken } = useAuth();

    const [courseData, setCourseData] = useState<any>(null);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        if (courseId) {
            fetchCourseDetails();
            checkEnrollmentStatus();
        }
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            const token = await getToken();
            const { data } = await api.get(`/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourseData(data);
        } catch (error) {
            console.error("Error fetching course details:", error);
        }
    };

    const checkEnrollmentStatus = async () => {
        try {
            const token = await getToken();
            const { data } = await api.get(`/progress/enrolled/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsEnrolled(data.enrolled);
        } catch (error) {
            console.error("Error checking enrollment status:", error);
        }
    };

    const enrollToCourse = async () => {
        try {
            const token = await getToken();
            const { status } = await api.post(
                `/progress/enroll`,
                { courseId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (status === 201) setIsEnrolled(true);
        } catch (error) {
            console.error("Error enrolling to course:", error);
        }
    };

    if (!courseData) return null;

    return (
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
            <LectureSection courseList={courseData?.lectures} />
        </ScrollView>
    );
};

export default CourseDetail;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
