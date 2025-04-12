import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Dimensions } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@/constants/Colors";
import UserPin from "./UserPin";

const SIZE = 250;

const Logo = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnims = Array(6)
    .fill(0)
    .map(() => useRef(new Animated.Value(0)).current);

  // Rotation Animation
  useEffect(() => {
    rotateAnim.setValue(0);

    const loop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    loop.start();

    return () => {
      loop.stop(); // <--- Stops old animation on unmount
    };
  }, []);
  // Pulsing Animation
  useEffect(() => {
    pulseAnims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 1000),
          Animated.timing(anim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const counterRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  const orbitRadius = SIZE * 0.68;

  // Helper for orbiting icon
  const OrbitingIcon = ({ angle, image }: { angle: number; image: number }) => {
    const rad = (angle * Math.PI) / 180;
    const x = orbitRadius * Math.cos(rad);
    const y = orbitRadius * Math.sin(rad);

    return (
      <Animated.View
        style={[
          styles.locationContainer,
          {
            transform: [
              { translateX: x },
              { translateY: y },
              { rotate: counterRotate },
            ],
          },
        ]}
      >
        {/* <Ionicons name="location-sharp" size={ICON_SIZE} color="red" /> */}
        <UserPin imageUri={image} />

        <View style={styles.shadow} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Pulse Circles */}
      {pulseAnims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.circle,
            {
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2],
                  }),
                },
              ],
              opacity: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0],
              }),
            },
          ]}
        />
      ))}

      {/* Rotating Orbit with Icons */}
      <Animated.View
        style={[styles.iconContainer, { transform: [{ rotate }] }]}
      >
        <OrbitingIcon
          angle={270}
          image={require("@/assets/images/person1-location-24.png")}
        />
        <OrbitingIcon
          angle={30}
          image={require("@/assets/images/person2-location-24.png")}
        />
        <OrbitingIcon
          angle={150}
          image={require("@/assets/images/person3-location-24.png")}
        />
      </Animated.View>

      {/* Central Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/tawsela-home-logo.png")}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    position: "absolute",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  locationContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    marginTop: 4,
    width: 16,
    height: 6,
    borderRadius: 10,
    backgroundColor: "darkgray",
  },
  circle: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default Logo;
