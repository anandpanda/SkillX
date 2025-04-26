import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

interface CourseCardProps {
    item: {
        _id: string;
        name: string;
        banner: string;
        lectures: any[];
        time: string;
        points: number;
    };
}

const CourseCard: React.FC<CourseCardProps> = ({ item }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item?.banner }} style={styles.cardImage} />
            <Text style={styles.courseTitle} numberOfLines={1}>
                {item?.name}
            </Text>
            <View style={styles.courseDetail}>
                <View style={styles.detailItem}>
                    <Feather name="book-open" size={18} color="black" />
                    <Text> {item?.lectures?.length} Lectures</Text>
                </View>
                <View style={styles.detailItem}>
                    <Feather name="clock" size={18} color="black" />
                    <Text>{item?.time} Hours</Text>
                </View>
            </View>
            <Text style={styles.price}>
                {item?.points === 0 ? "Free" : `${item.points} Points`}
            </Text>
        </View>
    );
};

export default CourseCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 15,
        marginRight: 15,
        width: 210,
    },
    cardImage: {
        width: "100%",
        height: 120,
        borderRadius: 15,
    },
    courseTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 8,
    },
    courseDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    price: {
        marginTop: 5,
        color: "#6857E8",
        fontWeight: "bold",
    },
});
