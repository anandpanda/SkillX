import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // Make sure you installed this!
import api from "@/app/Services/api";
import Toast from "react-native-toast-message";

type Lecture = {
  title: string;
  description: string;
  type: string;
  videoLink: string;
  meetingLink: string;
  scheduledAt: string;
  duration: string;
};

const AddLectureScreen = () => {
  const router = useRouter();
  const { courseId } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("recorded");
  const [videoLink, setVideoLink] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [duration, setDuration] = useState("");

  const [lectures, setLectures] = useState<Lecture[]>([]);

  const handleAddToList = () => {
    if (!title || !description || !type) {
      Toast.show({
        type: "error",
        text1: "Missing Field",
        text2: "Please fill out all fields before creating the course.",
      });
      return;
    }

    const newLecture = {
      title,
      description,
      type,
      videoLink,
      meetingLink,
      scheduledAt,
      duration,
    };

    setLectures((prev) => [...prev, newLecture]);

    // Reset inputs
    setTitle("");
    setDescription("");
    setType("recorded");
    setVideoLink("");
    setMeetingLink("");
    setScheduledAt("");
    setDuration("");

    Toast.show({
      type: "success",
      text1: "Lecture added to list 🙌",
    });
  };

  const handleSubmitAll = async () => {
    if (lectures.length === 0) {
      Toast.show({
        type: "error",
        text1: "No lectures to add",
      });
      return;
    }

    try {
      for (const lectureData of lectures) {
        const response = await api.post("/lectures", lectureData);
        await api.post("/courses/add-lecture", {
          courseId,
          lectureId: response.data._id,
        });
      }
      Toast.show({
        type: "success",
        text1: "All lectures added successfully👌",
      });
      router.back();
    } catch (error) {
      console.error("Error submitting lectures:", error);
      Toast.show({
        type: "failure",
        text1: "Failed to add lectures to course 😭",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📖 Add Lecture</Text>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Lecture Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Lecture Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Recorded" value="recorded" />
            <Picker.Item label="Live" value="live" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Video Link (for recorded)"
          value={videoLink}
          onChangeText={setVideoLink}
        />
        <TextInput
          style={styles.input}
          placeholder="Meeting Link (for live)"
          value={meetingLink}
          onChangeText={setMeetingLink}
        />
        <TextInput
          style={styles.input}
          placeholder="Scheduled At (Date Time)"
          value={scheduledAt}
          onChangeText={setScheduledAt}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration (minutes)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.primaryButton} onPress={handleAddToList}>
        <Text style={styles.buttonText}>+ Add to List</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleSubmitAll}
      >
        <Text style={styles.buttonText}>Submit All</Text>
      </TouchableOpacity>

      {/* Preview Section */}
      {lectures.length > 0 && (
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Lectures Added</Text>
          {lectures.map((lecture, index) => (
            <View key={index} style={styles.lectureItem}>
              <Text style={styles.lectureTitle}>
                {index + 1}. {lecture.title}
              </Text>
              <Text style={styles.lectureDetails}>
                Type:{" "}
                {lecture.type.charAt(0).toUpperCase() + lecture.type.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#222",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  input: {
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  pickerContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 12,
  },
  secondaryButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
    textAlign: "center",
  },
  lectureItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },
  lectureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  lectureDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});

export default AddLectureScreen;
