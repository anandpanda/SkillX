import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Star, Users } from "lucide-react-native";

interface CourseCardProps {
    course: {
        id: string;
        name: string;
        banner: string;
        enrolledCount: number;
        points: string;
        status?: "published" | "draft";
        publishedAt: string | null;
    };
    onPress: (id: string) => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
    const enrolledCount = course.enrolledCount ?? 0;
    const bannerUri = course.banner || "https://via.placeholder.com/600x300";
    const publishedDate = course.publishedAt 
        ? new Date(course.publishedAt).toLocaleDateString() 
        : "—";

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => course.id ? onPress(course.id) : null}
        >
            <Image
                source={{ uri: bannerUri }}
                style={styles.thumbnail}
            />
            <View style={styles.statusContainer}></View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {course.name || "Untitled Course"}
                </Text>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Users size={14} color="#6B7280" />
                        <Text style={styles.statText}>{enrolledCount}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Star size={14} color="#F59E0B" />
                        <Text style={styles.statText}>5</Text>
                    </View>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.price}>{course.points || "0"} Points</Text>
                    <Text style={styles.updated}>
                        Published At {publishedDate}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 280,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginRight: 16,
        overflow: "hidden",
    },
    thumbnail: {
        width: "100%",
        height: 140,
        resizeMode: "cover",
    },
    statusContainer: {
        position: "absolute",
        top: 8,
        right: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 100,
    },
    statusText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "500",
    },
    contentContainer: {
        padding: 12,
    },
    title: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 22,
        color: "#1F2937",
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: "row",
        marginBottom: 8,
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },
    statText: {
        fontSize: 12,
        color: "#6B7280",
        marginLeft: 4,
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#3B82F6",
    },
    updated: {
        fontSize: 11,
        color: "#9CA3AF",
    },
});
