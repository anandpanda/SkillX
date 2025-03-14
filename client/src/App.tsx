import React, {useEffect, useState} from 'react';
import {getItem, removeItem} from '../utils/asyncStorage';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
// Type of navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import OnboardingScreen from './screens/OnboardingScreen';
import BottomBar from '../navigation/BottomBar';
import LoginScreen from './screens/LoginScreen';
import {ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-react';

const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

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
  const [showOnboarding, setShowOnboarding] = useState<undefined | null>(
    undefined,
  );
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    checkIfOnboarded();
  }, [setShowOnboarding, showOnboarding]);

  const checkIfOnboarded = async () => {
    let onboarding = await getItem('onboarded');
    if (onboarding === '1') {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setRefresh(prev => !prev); // Toggle refresh state to force a re-render
  };

  if (showOnboarding == null) {
    return null;
  }

  return (
    <NavigationContainer>
      {showOnboarding ? (
        // <OnboardingScreen onComplete={handleOnboardingComplete} />
        <ClerkProvider
          // need to hide this key in env
          publishableKey={PUBLISHABLE_KEY}>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
          <SignedIn></SignedIn>
        </ClerkProvider>
      ) : (
        <BottomBar />
      )}
    </NavigationContainer>
  );
}
