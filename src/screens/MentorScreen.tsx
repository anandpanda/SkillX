import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MentorScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MentorScreen</Text>
    </View>
  );
};

export default MentorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
