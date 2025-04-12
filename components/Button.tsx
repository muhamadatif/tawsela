import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";

const TYPE = {
  primary: COLORS.primary,
  secondary: COLORS.secondary,
  tertiary: COLORS.gray[100],
};

const Button = ({
  buttonText,
  onPress,
  type = "primary",
}: {
  buttonText: string;
  onPress: () => void;
  type?: "primary" | "secondary" | "tertiary";
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: TYPE[type] }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          { color: type === "tertiary" ? COLORS.primary : COLORS.white },
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Button;
