import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Feather from "@expo/vector-icons/Feather";
import CoinImage from "@/assets/images/coin.png";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    isLoaded && (
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.subContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text style={styles.headerText}>Welcome! </Text>
              <Text style={styles.headerText}>{user?.fullName}</Text>
            </View>
          </View>
          <View style={styles.points}>
            <Image source={CoinImage} style={styles.coinImage} />
            <Text style={styles.points}>575</Text>
          </View>
        </View>
        <View style={styles.searchBox}>
          <TextInput placeholder="Search Courses.." style={styles.searchArea} />
          <Feather
            name="search"
            size={24}
            color="white"
            style={styles.searchIcon}
          />
        </View>
      </View>
    )
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  headerText: {
    color: "white",
    fontSize: 15,
    fontWeight: 600,
  },
  points: {
    flexDirection: "row",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    gap: 5,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  searchBox: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 80,
    marginTop: 30,
  },
  searchArea: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 20,
  },
  searchIcon: {
    backgroundColor: "#6857E8",
    marginRight: 10,
    padding: 8,
    borderRadius: 99,
  },
});
