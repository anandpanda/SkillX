import { Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/home.png")}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? "purple" : "black",
              }}
            />
          ),
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="(learner)"
        options={{
          title: "Learner",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/student.png")}
              style={{
                height: 28,
                width: 28,
                tintColor: focused ? "purple" : "black",
              }}
            />
          ),
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="(ai)"
        options={{
          title: "AI",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/ai.png")}
              style={{
                height: 35,
                width: 35,
                tintColor: focused ? "purple" : "black",
              }}
            />
          ),
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="(mentor)"
        options={{
          title: "Mentor",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/mentor.png")}
              style={{
                height: 28,
                width: 28,
                tintColor: focused ? "purple" : "black",
              }}
            />
          ),
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarStyle: { display: "none" },                                                                                                              
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/user.png")}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? "purple" : "black",
              }}
            />
          ),
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
