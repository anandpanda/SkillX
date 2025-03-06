import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {setItem} from '../../utils/asyncStorage';

// This will get the current devices width and height
const {width, height} = Dimensions.get('window');

export default function OnboardingScreen({onComplete}) {
  // const navigation = useNavigation();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleDone = () => {
    // navigation.navigate('Home');
    setItem('onboarded', '1');
    onComplete();
  };

  const statusBarColors = [
    '#fff',
    '#a7f3d0',
    '#fef3c7',
    '#B771E5',
    '#A1E3F9',
    '#E8F9FF',
  ];

  const handlePageChange = (index: number) => {
    setCurrentPageIndex(index);
    StatusBar.setBackgroundColor(statusBarColors[index]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={statusBarColors[currentPageIndex]} />
      <Onboarding
        containerStyles={{paddingHorizontal: 15}}
        onDone={handleDone}
        onSkip={handleDone}
        onChange={handlePageChange}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
              />
            ),
            title: 'Learn.Teach.Exchange',
          },
          {
            backgroundColor: '#a7f3d0',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onboardingAnimation1.json')}
                  autoPlay
                  loop
                  style={{width: 300, height: 400}}
                />
              </View>
            ),
            title:
              'SkillX helps you learn and exchange skills with others for free',
          },
          {
            backgroundColor: '#fef3c7',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onboardingAnimation2.json')}
                  autoPlay
                  loop
                  style={{width: 300, height: 400}}
                />
              </View>
            ),
            title: 'Teach & Learn For Free !',
          },
          {
            backgroundColor: '#B771E5',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onboardingAnimation3.json')}
                  autoPlay
                  loop
                  style={{width: 300, height: 400}}
                />
              </View>
            ),
            title: 'Earn Reward Points On Teaching A Skill To Someone !',
          },
          {
            backgroundColor: '#A1E3F9',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onboardingAnimation4.json')}
                  autoPlay
                  loop
                  style={{width: 300, height: 400}}
                />
              </View>
            ),
            title: 'Find Best Match With AI To Learn New Skills',
          },
          {
            backgroundColor: '#E8F9FF',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require('../../assets/animations/onboardingAnimation5.json')}
                  autoPlay
                  loop
                  style={{width: 400, height: 400}}
                />
              </View>
            ),
            title: 'Schedule , Go live or Watch recorded',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
  },
  logo: {
    width: 350,
    height: 300,
  },
  lottie: {
    alignItems: 'center',
    width: width * 0.9,
    height: width,
  },
});
