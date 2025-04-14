import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { Image } from "expo-image";

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("@/assets/images/Tawsela-logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    height: Platform.OS === "ios" ? 345 : 300,
    objectFit: "contain",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
export default Logo;
