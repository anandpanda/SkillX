import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import api from "@/app/Services/api";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "expo-router";
import Toast from "react-native-toast-message";

const CreateCourseScreen = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [time, setTime] = useState("");
  const [points, setPoints] = useState("");
  const [author, setAuthor] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [tags, setTags] = useState("");
  const [scheduledDateStr, setScheduledDateStr] = useState(""); // e.g. "2025-04-30"

  const handleSubmit = async () => {
    if (
      !name ||
      !description ||
      !banner ||
      !time ||
      !points ||
      !author ||
      !tags ||
      !scheduledDateStr
    ) {
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
      author,
      level,
      tags: tags.split(",").map((tag) => tag.trim()),
      scheduledAt: new Date(scheduledDateStr).toISOString(),
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
    setAuthor("");
    setLevel("Beginner");
    setTags("");
    setScheduledDateStr("");
  };

  useFocusEffect(
    // usecallback helps in preventing recreation of function unecessarliy when , the component re-renders
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
          <TextInput
            style={styles.input}
            placeholder="Banner URL"
            value={banner}
            onChangeText={setBanner}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Author"
            value={author}
            onChangeText={setAuthor}
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
          <TextInput
            style={styles.input}
            placeholder="Scheduled Date (YYYY-MM-DD)"
            value={scheduledDateStr}
            onChangeText={setScheduledDateStr}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
});

export default CreateCourseScreen;
