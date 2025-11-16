import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Alert,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const scrollRef = useRef<ScrollView>(null);

    useFocusEffect(() => {
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
        console.log("ProfileScreen mounted - API call temporarily disabled for debugging");
        setIsLoading(false);
        setUserCourses([]);
        setEnrolledStudents(0);
    }, []);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container} edges={["right", "left"]}>
                <ProfileHeader
                    name={user?.fullName || "User"}
                    imageUrl={
                        user?.imageUrl || "https://via.placeholder.com/100"
                    }
                />
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading profile...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={["right", "left"]}>
            <ScrollView
                ref={scrollRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <ProfileHeader
                    name={user?.fullName || "User"}
                    imageUrl={
                        user?.imageUrl || "https://via.placeholder.com/100"
                    }
                />

                <View style={styles.content}>
                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    {/* Stats Section */}
                    <View style={styles.statsContainer}>
                        <StatsCard
                            icon={<Feather name="users" size={22} color="#3B82F6" />}
                            value={enrolledStudents.toLocaleString()}
                            label="Students"
                        />
                        <StatsCard
                            icon={<Feather name="book-open" size={22} color="#8B5CF6" />}
                            value={userCourses.length.toLocaleString()}
                            label="Courses"
                        />
                    </View>

                    {/* My Courses Section */}
                    <View>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>My Courses</Text>
                        </View>

                        {userCourses.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No courses yet</Text>
                            </View>
                        ) : (
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.coursesScrollContent}
                            >
                                {userCourses.map((course: any, index: number) => (
                                    <View
                                        key={course?._id ?? course?.id ?? `course-${index}`}
                                    >
                                        <CourseCard
                                            course={course}
                                            onPress={handleCoursePress}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                    </View>

                    {/* Settings Section */}
                    <View style={styles.settingsContainer}>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleLogout}
                        >
                            <Feather name="log-out" size={20} color="#EF4444" />
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    loadingText: {
        fontSize: 16,
        color: "#6B7280",
    },
    errorContainer: {
        backgroundColor: "#FEE2E2",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        color: "#DC2626",
        fontSize: 14,
    },
    emptyContainer: {
        padding: 24,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 14,
        color: "#6B7280",
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: "500",
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
        fontSize: 18,
        fontWeight: "bold",
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
        fontSize: 16,
        fontWeight: "500",
        color: "#EF4444",
        marginLeft: 12,
    },
});
