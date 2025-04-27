import { Image, StyleSheet, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";

interface ProfileHeaderProps {
    name: string;
    imageUrl: string;
}

export default function ProfileHeader({ name, imageUrl }: ProfileHeaderProps) {
    return (
        <LinearGradient
            colors={["#3B82F6", "#1E40AF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
        >
            <Animated.View
                style={styles.profileContent}
                entering={FadeInDown.delay(100).duration(500)}
            >
                <Image source={{ uri: imageUrl }} style={styles.avatar} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.bio}>
                    Experienced educator with a passion for teaching and making
                    other's lives easier.
                </Text>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 16,
        zIndex: 10,
    },
    editButton: {
        position: "absolute",
        top: 50,
        right: 16,
        zIndex: 10,
    },
    profileContent: {
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    name: {
        fontFamily: "Inter-Bold",
        fontSize: 22,
        color: "#FFFFFF",
        marginTop: 12,
    },
    bio: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 4,
        textAlign: "center",
        paddingHorizontal: 32,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },
    stars: {
        flexDirection: "row",
        marginRight: 6,
    },
    star: {
        color: "#FFCA28",
        fontSize: 16,
    },
    ratingText: {
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.8)",
    },
    badgesContainer: {
        flexDirection: "row",
        marginTop: 16,
    },
    badge: {
        backgroundColor: "#10B981",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        marginHorizontal: 4,
    },
    badgeText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 12,
        color: "#FFFFFF",
    },
});
