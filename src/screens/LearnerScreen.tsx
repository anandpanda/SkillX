import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LearnerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LearnerScreen</Text>
    </View>
  );
};

export default LearnerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
