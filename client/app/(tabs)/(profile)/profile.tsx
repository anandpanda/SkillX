import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Alert,
    Animated as RNAnimated,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookOpen, LogOut, Users } from "lucide-react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    FadeInUp,
    FadeInRight,
} from "react-native-reanimated";

import ProfileHeader from "@/app/Components/profile/ProfileHeader";
import StatsCard from "@/app/Components/profile/StatsCard";
import CourseCard from "@/app/Components/profile/CourseCard";
import { useUser, useAuth } from "@clerk/clerk-expo";
import api from "@/app/Services/api";

export default function ProfileScreen() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [userCourses, setUserCourses] = useState([]);
    const [enrolledStudents, setEnrolledStudents] = useState(0);

    const scrollY = useSharedValue(0);
    const scrollRef = useRef<ScrollView>(null);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    useFocusEffect(() => {
        // Reset scroll position when tab is focused
        scrollRef.current?.scrollTo({ y: 0, animated: false });
    });

    const handleCoursePress = (courseId: string) => {
        // router.push({
        //     pathname: `/screens/courseDetail`,
        //     params: { courseId: item._id },
        // });
    };

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await signOut();
                            router.replace("/(auth)/sign-in");
                        } catch (error) {
                            console.error("Error during logout:", error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        const fetchCoursesAndStudentsByUser = async () => {
            try {
                const { data } = await api.get(
                    `/courses/author/${user?.firstName}`
                );

                setUserCourses(data.courses);
                setEnrolledStudents(data.studentsCount);

                console.log(
                    "Courses and students fetched successfully:",
                    userCourses
                );
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };
        fetchCoursesAndStudentsByUser();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={["right", "left"]}>
            <Animated.ScrollView
                ref={scrollRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <ProfileHeader
                    name={user?.fullName || "User"}
                    imageUrl={
                        user?.imageUrl || "https://via.placeholder.com/100"
                    }
                />

                <View style={styles.content}>
                    {/* Stats Section */}
                    <Animated.View
                        style={styles.statsContainer}
                        entering={FadeInUp.delay(200).duration(500)}
                    >
                        <StatsCard
                            icon={<Users size={22} color="#3B82F6" />}
                            value={enrolledStudents.toLocaleString()}
                            label="Students"
                        />
                        <StatsCard
                            icon={<BookOpen size={22} color="#8B5CF6" />}
                            value={userCourses.length.toLocaleString()}
                            label="Courses"
                        />
                    </Animated.View>

                    {/* My Courses Section */}
                    <Animated.View entering={FadeInUp.delay(300).duration(500)}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>My Courses</Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.coursesScrollContent}
                        >
                            {userCourses.map((course, index) => (
                                <Animated.View
                                    key={course.id}
                                    entering={FadeInRight.delay(
                                        400 + index * 100
                                    ).duration(400)}
                                >
                                    <CourseCard
                                        course={course}
                                        onPress={handleCoursePress}
                                    />
                                </Animated.View>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    {/* Settings Section */}
                    <Animated.View
                        style={styles.settingsContainer}
                        entering={FadeInUp.delay(600).duration(500)}
                    >
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleLogout}
                        >
                            <LogOut size={20} color="#EF4444" />
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    scrollView: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        marginBottom: 24,
        gap: 8,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: "Inter-Bold",
        fontSize: 18,
        color: "#1F2937",
    },
    viewAllText: {
        fontFamily: "Inter-Medium",
        fontSize: 14,
        color: "#3B82F6",
    },
    coursesScrollContent: {
        paddingBottom: 24,
        paddingLeft: 0,
    },
    settingsContainer: {
        marginBottom: 24,
    },
    settingsTitle: {
        fontFamily: "Inter-Bold",
        fontSize: 18,
        color: "#1F2937",
        marginBottom: 16,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        marginTop: 8,
    },
    logoutText: {
        fontFamily: "Inter-Medium",
        fontSize: 16,
        color: "#EF4444",
        marginLeft: 12,
    },
});
