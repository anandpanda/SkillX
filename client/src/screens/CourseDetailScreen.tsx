import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import type { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// type IconProps = PropsWithChildren<{
//     name: string;// e.g. 'ios-home'
//     size: number;// e.g. 24
//     color: string;// e.g. '#000'
// }>;

const CourseDetailScreen = () => {
  const lessons = [
    {title: 'Introduction', duration: '2 Min 18 Sec', completed: true},
    {title: 'What UI UX design?', duration: '18 Min 46 Sec', locked: true},
    {title: 'How to make wireframe', duration: '20 Min 58 Sec', locked: true},
    {title: 'Your first design', duration: '15 Min 20 Sec', locked: false},
    {title: 'How to make wireframe ', duration: '20 Min 58 Sec', locked: true},
    {title: 'Your first design ', duration: '15 Min 20 Sec', locked: false},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Video Preview */}
          <View style={styles.videoContainer}>
            <Image
              source={{
                uri: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200214165928/Web-Development-Course-Thumbnail.jpg',
              }}
              style={styles.videoThumbnail}
            />
            <TouchableOpacity style={styles.playButton}>
              {/* <Icon name="play" size={30} color="#6C63FF" /> */}
            </TouchableOpacity>
          </View>

          {/* Course Info */}
          <Text style={styles.courseTitle}>Figma UI UX Design Essentials</Text>
          <Text style={styles.courseAuthor}>Created by Artur Denisovich</Text>
          <Text style={styles.courseRating}>⭐ 4.8 · 72 Hours</Text>
          <Text style={styles.coursePrice}>$40</Text>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity style={styles.activeTab}>
              <Text style={styles.activeTabText}>Playlist (22)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inactiveTab}>
              <Text style={styles.inactiveTabText}>Description</Text>
            </TouchableOpacity>
          </View>

          {/* Playlist */}
          <View style={styles.listContainer}>
            <FlatList
              data={lessons}
              keyExtractor={item => item.title}
              renderItem={({item}) => (
                <View style={styles.lessonContainer}>
                  <Icon name="play-circle" size={24} color="#6C63FF" />
                  <View style={styles.lessonTextContainer}>
                    <Text style={styles.lessonTitle}>{item.title}</Text>
                    <Text style={styles.lessonDuration}>{item.duration}</Text>
                  </View>
                  {item.completed ? (
                    <Icon name="check" size={24} color="green" />
                  ) : null}
                  {item.locked ? (
                    <Icon name="lock" size={24} color="gray" />
                  ) : null}
                </View>
              )}
              scrollEnabled={false} // Prevents FlatList from causing nested scroll issues
            />
          </View>
        </ScrollView>

        {/* Sticky Bottom Buttons */}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.wishlistButton}>
            <Icon name="bookmark" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.enrollButton}>
            <LinearGradient
              colors={['#6C63FF', '#5145CD']}
              style={styles.enrollGradient}>
              <Text style={styles.enrollText}>Enroll Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f8f8f8',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100, // Prevents overlap with bottom buttons
  },
  videoContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 20,
  },
  videoThumbnail: {
    width: '100%',
    height: 150,
  },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: '42%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  courseAuthor: {
    color: '#6C63FF',
    marginVertical: 5,
  },
  courseRating: {
    color: '#888',
  },
  coursePrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginVertical: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  activeTab: {
    flex: 1,
    backgroundColor: '#6C63FF',
    padding: 10,
    borderRadius: 20,
  },
  activeTabText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inactiveTab: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
  },
  inactiveTabText: {
    color: '#555',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listContainer: {
    marginBottom: 20, // Provides space before bottom buttons
  },
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
  },
  lessonTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  lessonTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  lessonDuration: {
    color: '#888',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  wishlistButton: {
    width: '30%',
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  enrollButton: {
    width: '65%',
  },
  enrollGradient: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  enrollText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CourseDetailScreen;
