import { Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
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
          headerShown: false,
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
        name="(mentor)"
        options={{
          headerShown: false,
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
          headerShown: false,
          title: "Profile",
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
