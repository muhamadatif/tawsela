import React from "react";
import { View, StyleSheet, Image } from "react-native";

const ICON_SIZE = 28;

const UserPin = ({ imageUri }: { imageUri: number }) => {
  return (
    <View style={styles.pinContainer}>
      {/* Circular profile image */}
      <View style={styles.imageWrapper}>
        <Image source={imageUri} style={styles.avatar} />
      </View>

      {/* Triangle tip */}
      <View style={styles.tip} />
    </View>
  );
};

const styles = StyleSheet.create({
  pinContainer: {
    alignItems: "center",
  },
  imageWrapper: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: "white",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white", //
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: ICON_SIZE / 2,
  },
  tip: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    marginTop: -1,
  },
});

export default UserPin;
