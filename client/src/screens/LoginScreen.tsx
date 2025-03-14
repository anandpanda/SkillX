import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import loginImage from '../../assets/images/login.png';
import googleImage from '../../assets/images/google.png';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={loginImage} style={styles.loginImage} />
      <View style={styles.colorContainer}>
        <Text style={styles.heading}>SkillX</Text>
        <Text style={styles.subHeading}>Teach.Learn.Exchange</Text>
        <TouchableOpacity style={styles.signInContainer}>
          <Image source={googleImage} style={styles.googleImage} />
          <Text style={styles.signInText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginImage: {
    width: 250,
    height: 300,
    marginTop: 80,
  },
  colorContainer: {
    height: 400,
    width: '100%',
    backgroundColor: '#6857E8',
    alignItems: 'center',
  },
  heading: {
    marginTop: 30,
    color: 'white',
    fontWeight: 800,
    fontSize: 45,
  },
  subHeading: {
    marginTop: 10,
    color: '#C2BAFF',
    fontWeight: 500,
    fontSize: 30,
  },
  googleImage: {
    width: 40,
    height: 40,
  },
  signInContainer: {
    width: 300,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 50,
    gap: 10,
    marginTop: 120,
  },
  signInText: {
    color: '#6857E8',
    fontWeight: 600,
    fontSize: 18,
  },
});
