import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Star, Users } from "lucide-react-native";

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        thumbnail: string;
        students: number;
        rating: number;
        price: string;
        status: "published" | "draft";
        lastUpdated: string;
    };
    onPress: (id: string) => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => onPress(course.id)}
        >
            <Image
                source={{ uri: course.thumbnail }}
                style={styles.thumbnail}
            />
            <View style={styles.statusContainer}></View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {course.title}
                </Text>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Users size={14} color="#6B7280" />
                        <Text style={styles.statText}>{course.students}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Star size={14} color="#F59E0B" />
                        <Text style={styles.statText}>{course.rating}</Text>
                    </View>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.price}>{course.price}</Text>
                    <Text style={styles.updated}>
                        Updated {course.lastUpdated}
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
        fontFamily: "Inter-Medium",
    },
    contentContainer: {
        padding: 12,
    },
    title: {
        fontFamily: "Inter-SemiBold",
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
        fontFamily: "Inter-Regular",
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
        fontFamily: "Inter-Bold",
        fontSize: 14,
        color: "#3B82F6",
    },
    updated: {
        fontFamily: "Inter-Regular",
        fontSize: 11,
        color: "#9CA3AF",
    },
});
