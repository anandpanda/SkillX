import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface StatsCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}

export default function StatsCard({ icon, value, label }: StatsCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>{icon}</View>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        minWidth: 100,
        flex: 1,
    },
    iconContainer: {
        marginBottom: 8,
    },
    value: {
        fontWeight: "700",
        fontSize: 20,
        color: "#1F2937",
        marginBottom: 2,
    },
    label: {
        fontWeight: "400",
        fontSize: 12,
        color: "#6B7280",
        textAlign: "center",
    },
});
