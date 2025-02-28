import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getItem} from '../utils/asyncStorage';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
// Type of navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';

// Type checking: {optional}
// This is the type of data that other screens can expect
// export type RootStackParamList = {
//   Home: undefined;
//   Details: {loggedin: Boolean};
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

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
        <Stack.Navigator initialRouteName="Home">
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
  }
}

const styles = StyleSheet.create({});
