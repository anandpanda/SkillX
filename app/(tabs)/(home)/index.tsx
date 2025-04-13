import { ScrollView, StyleSheet, View, StatusBar } from "react-native";
import Header from "@/app/Components/HomeScreen/Header";
import CourseList from "@/app/Components/HomeScreen/CourseList";

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#6857E8" barStyle="default" />
      <View style={styles.headerSection}>
        <Header />
      </View>
      <View style={styles.courses}>
        <View style={styles.basicCourse}>
          <CourseList level={"basic"} />
        </View>
        <CourseList level={"moderate"} />
        <CourseList level={"advance"} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: "#6857E8",
    width: "100%",
    height: 350,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  courses: {
    padding: 15,
  },
  basicCourse: {
    marginTop: -180,
  },
});
