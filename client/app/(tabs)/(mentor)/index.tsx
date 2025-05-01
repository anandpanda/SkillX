import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";
import api from "@/app/Services/api";
import { useRouter, useFocusEffect } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

const CreateCourseScreen = () => {
    const router = useRouter();
    const { user } = useUser();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState("");
    const [time, setTime] = useState("");
    const [points, setPoints] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [tags, setTags] = useState("");
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const uploadImageToCloudinary = async (imageUri: string) => {
        const formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            type: "image/jpeg", // or "image/png"
            name: "course-banner.jpg",
        });
        formData.append("upload_preset", "skillx");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/anandpanda/image/upload",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
    };

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            try {
                setUploading(true);
                const cloudinaryUrl = await uploadImageToCloudinary(
                    result.assets[0].uri
                );
                setBanner(cloudinaryUrl);
                setImagePreview(cloudinaryUrl);
                Toast.show({
                    type: "success",
                    text1: "Image Uploaded",
                });
            } catch {
                Toast.show({
                    type: "error",
                    text1: "Upload Failed",
                });
            } finally {
                setUploading(false);
            }
        }
    };

    const handleSubmit = async () => {
        if (!name || !description || !banner || !time || !points || !tags) {
            Toast.show({
                type: "error",
                text1: "Missing Field",
                text2: "Please fill out all fields before creating the course.",
            });
            return;
        }

        const courseData = {
            name,
            description,
            banner,
            time,
            points,
            author: user?.username || user?.firstName || "Unknown",
            level,
            tags: tags.split(",").map((tag) => tag.trim()),
        };

        try {
            const response = await api.post("/courses", courseData);
            console.log("Course Created:", response.data);
            router.push({
                pathname: `/pages/addLectureScreen`,
                params: { courseId: response.data._id },
            });
        } catch (error) {
            console.error(
                "Error creating course:",
                error?.response?.data || error.message || error
            );
        }
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setBanner("");
        setTime("");
        setPoints("");
        setLevel("Beginner");
        setTags("");
        setImagePreview(null);
    };

    useFocusEffect(
        useCallback(() => {
            resetForm();
        }, [])
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>🎯 Create New Course</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Course Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={handleImagePick}
                    >
                        <Text style={styles.uploadButtonText}>
                            {uploading
                                ? "Uploading..."
                                : "📤 Upload Course Banner"}
                        </Text>
                    </TouchableOpacity>

                    {imagePreview && (
                        <Image
                            source={{ uri: imagePreview }}
                            style={styles.bannerImage}
                        />
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Time"
                        value={time}
                        onChangeText={setTime}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Points"
                        value={points}
                        onChangeText={setPoints}
                    />

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={level}
                            onValueChange={(itemValue) => setLevel(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Beginner" value="Beginner" />
                            <Picker.Item label="Moderate" value="Moderate" />
                            <Picker.Item label="Advanced" value="Advanced" />
                        </Picker>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChangeText={setTags}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>🚀 Create Course</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#F5F7FA",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    formContainer: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#4B3F72",
    },
    input: {
        height: 48,
        borderColor: "#D1D5DB",
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: "#F9FAFB",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#6C63FF",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: "#F9FAFB",
        overflow: "hidden",
    },
    picker: {
        height: 55,
        paddingHorizontal: 14,
    },
    uploadButton: {
        borderColor: "#D1D5DB",
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#F9FAFB",
    },
    uploadButtonText: {
        color: "#111827",
        fontSize: 16,
    },
    bannerImage: {
        width: "100%",
        height: 180,
        borderRadius: 10,
        marginBottom: 15,
    },
});

export default CreateCourseScreen;
