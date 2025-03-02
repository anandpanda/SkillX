import React, {useEffect, useState} from 'react';
import {getItem} from '../utils/asyncStorage';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
// Type of navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import LearnerScreen from './screens/LearnerScreen';
import MentorScreen from './screens/MentorScreen';
import ProfileScreen from './screens/ProfileScreen';
import {Image} from 'react-native';

// Type checking: {optional}
// This is the type of data that other screens can expect
// export type RootStackParamList = {
//   Home: undefined;
//   Details: {loggedin: Boolean};
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfOnboarded();
  }, []);

  const checkIfOnboarded = async () => {
    let onboarding = await getItem('onboarded');
    if (onboarding == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            options={{headerShown: false}}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
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
      </NavigationContainer>
    );
  }
}
