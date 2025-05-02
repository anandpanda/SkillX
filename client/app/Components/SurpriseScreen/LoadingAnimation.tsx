import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const LoadingAnimation = ({ message = "Generating AI recommendations..." }) => {
  // Create animated values for the dots
  const dot1Opacity = new Animated.Value(0.3);
  const dot2Opacity = new Animated.Value(0.3);
  const dot3Opacity = new Animated.Value(0.3);
  
  // Create an animated value for the brain pulse
  const brainScale = new Animated.Value(1);

  // Function to animate the dots in sequence
  const animateDots = () => {
    Animated.loop(
      Animated.sequence([
        // Dot 1
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Dot 2
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Dot 3
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Reset all
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  // Function to animate the brain pulsing
  const animateBrain = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(brainScale, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.timing(brainScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Start animations when component mounts
  useEffect(() => {
    animateDots();
    animateBrain();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text 
        style={[
          styles.brainEmoji,
          { transform: [{ scale: brainScale }] }
        ]}
      >
        🧠
      </Animated.Text>
      <Text style={styles.loadingText}>{message}</Text>
      <View style={styles.dotsContainer}>
        <Animated.Text style={[styles.dot, { opacity: dot1Opacity }]}>•</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot2Opacity }]}>•</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dot3Opacity }]}>•</Animated.Text>
      </View>
      <Text style={styles.subText}>Analyzing your interests</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brainEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    color: '#fff',
    fontSize: 40,
    marginHorizontal: 5,
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default LoadingAnimation;