import { COLORS } from "@/constants/Colors";
import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OTPComponent = ({
  otp,
  setOtp,
}: {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (inputsRef.current[index] = ref)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    borderColor: COLORS.gray[400],
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 5,
  },
});

export default OTPComponent;
