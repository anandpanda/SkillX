import {View, Text, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Screens
import HomeScreen from '../src/screens/HomeScreen';
import LearnerScreen from '../src/screens/LearnerScreen';
import MentorScreen from '../src/screens/MentorScreen';
import ProfileScreen from '../src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: 'shift',
        tabBarStyle: {
          paddingTop: 6,
          height: 60,
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/home.png')}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? 'purple' : 'black',
              }}
            />
          ),
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'black',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Learner"
        options={{
          headerShown: false,
          title: 'Learner',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/student.png')}
              style={{
                height: 28,
                width: 28,
                tintColor: focused ? 'purple' : 'black',
              }}
            />
          ),
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'black',
        }}
        component={LearnerScreen}
      />
      <Tab.Screen
        name="Mentor"
        options={{
          headerShown: false,
          title: 'Mentor',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/mentor.png')}
              style={{
                height: 28,
                width: 28,
                tintColor: focused ? 'purple' : 'black',
              }}
            />
          ),
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'black',
        }}
        component={MentorScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/user.png')}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? 'purple' : 'black',
              }}
            />
          ),
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'black',
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
