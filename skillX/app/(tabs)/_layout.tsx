import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

export default function _layout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/home.png")}
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
        name="learner"
        options={{
          headerShown: false,
          title: "Learner",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/student.png")}
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
        name="mentor"
        options={{
          headerShown: false,
          title: "Mentor",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/mentor.png")}
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
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/user.png")}
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
        name="home"
        options={{
          headerShown: false,
          title: "New Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/user.png")}
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
