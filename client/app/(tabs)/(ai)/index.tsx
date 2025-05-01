import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "@/app/Services/api";
import { useRouter } from "expo-router";

// Import components
import InterestTags from "@/app/Components/SurpriseScreen/InterestTags";
import RecommendedCoursesList from "@/app/Components/SurpriseScreen/RecommendedCourseList"
import LoadingAnimation from "@/app/Components/SurpriseScreen/LoadingAnimation";

// Import Gemini service
import { getRecommendations, getFallbackRecommendations } from "@/app/Services/geminiService";

// Interest list 
const interestsList = [
  // Technology & Development
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Data Science",
  "Machine Learning",
  "React",
  "AI",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Blockchain",

  // Design & Creativity
  "Graphic Design",
  "UI/UX",
  "3D Modeling",
  "Animation",
  "Video Editing",
  "Photography",
  "Interior Design",
  "Fashion Design",

  // Business & Marketing
  "Entrepreneurship",
  "Finance",
  "Investing",
  "Digital Marketing",
  "SEO",
  "Product Management",
  "Sales",
  "E-Commerce",

  // Academics & Science
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "Psychology",
  "History",
  "Philosophy",
  "Economics",

  // Lifestyle & Wellness
  "Fitness",
  "Yoga",
  "Meditation",
  "Nutrition",
  "Health & Wellness",
  "Cooking",
  "Travel",
  "Home Improvement",

  // Arts & Entertainment
  "Music",
  "Singing",
  "Guitar",
  "Piano",
  "Dance",
  "Acting",
  "Creative Writing",
  "Poetry",

  // Language & Communication
  "English",
  "Public Speaking",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Sign Language",
  "Writing",

  // Career & Personal Development
  "Resume Writing",
  "Interview Skills",
  "Leadership",
  "Time Management",
  "Productivity",
  "Emotional Intelligence",
  "Critical Thinking",

  // Others / Hobby & Niche
  "DIY",
  "Gardening",
  "Pet Training",
  "Gaming",
  "Bike Riding",
  "Chess",
  "Astronomy",
  "Photography",
];

const SurpriseScreen = () => {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // 1: selecting, 2: loading, 3: showing results
  
  // Create fade animation for transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const fetchCoursesWithAI = async () => {
    // Validate selection
    if (selectedInterests.length === 0) {
      setError("Please select at least one interest");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    // Fade out current screen
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Set loading state
      setStep(2);
      setLoading(true);
      
      // Fade in loading screen
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Fetch courses
      fetchAndProcessCourses();
    });
  };

  const fetchAndProcessCourses = async () => {
    try {
      // Fetch all available courses
      const response = await api.get("/courses");
      const allCourses = response.data;
      
      try {
        // Try getting AI recommendations
        const recommendations = await getRecommendations(selectedInterests, allCourses);
        setCourses(recommendations);
      } catch (aiError) {
        console.error("AI recommendation error:", aiError);
        
        // Fallback to tag-based filtering if AI fails
        const fallbackCourses = getFallbackRecommendations(selectedInterests, allCourses);
        setCourses(fallbackCourses);
      }
      
      // Fade out loading screen
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Show results
        setStep(3);
        setLoading(false);
        
        // Fade in results screen
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses. Please try again.");
      
      // Reset to selection screen
      setStep(1);
      setLoading(false);
    }
  };

  const resetAndTryAgain = () => {
    // Fade out current screen
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Reset state
      setSelectedInterests([]);
      setCourses([]);
      setStep(1);
      
      // Fade in selection screen
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  // Render different screens based on current step
  const renderContent = () => {
    switch (step) {
      case 1: // Selection screen
        return (
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <Text style={styles.heading}>Tell us your Interests ✨</Text>
            <Text style={styles.heading2}>and get AI recommendations</Text>
            
            <InterestTags 
              interestsList={interestsList} 
              selectedInterests={selectedInterests} 
              toggleInterest={toggleInterest} 
            />
            
            {error && <Text style={styles.errorText}>{error}</Text>}
            
            
            <TouchableOpacity
              style={styles.surpriseButton}
              onPress={fetchCoursesWithAI}
              disabled={loading}
            >
              <Text style={styles.surpriseButtonText}>
                Get AI Recommendations
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
        
      case 2: // Loading screen
        return (
          <Animated.View style={{ opacity: fadeAnim, flex: 1, justifyContent: 'center' }}>
            <LoadingAnimation />
          </Animated.View>
        );
        
      case 3: // Results screen
        return (
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <RecommendedCoursesList 
              courses={courses} 
              onTryAgain={resetAndTryAgain} 
            />
          </Animated.View>
        );
        
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={["#7F7FD5", "#86A8E7", "#91EAE4"]}
      style={styles.container}
    >
      {renderContent()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  heading2: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  surpriseButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  surpriseButtonText: {
    color: "#7F7FD5",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ffcccc",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SurpriseScreen;