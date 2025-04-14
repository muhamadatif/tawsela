import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "@/constants/Colors";

import { OtpInput } from "react-native-otp-entry";
import Button from "./Button";

const Verification = ({
  mobile,
  setState,
}: {
  mobile: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleValidate = async () => {
    const res = await fetch("https://localhost:7211/register/verify-mobile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: otp, mobile }),
    });
    const data = await res.json();
    if (res.ok) {
      setState("register");
    }
    if (!res.ok) {
      setError(data.message);
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Enter the Verification Code</Text>
      </View>
      <Text style={styles.description}>
        Please enter the verification code that was sent to your phone
      </Text>
      <View style={styles.otpContainer}>
        <OtpInput
          numberOfDigits={6}
          onTextChange={(text) => setOtp(text)}
          autoFocus={false}
          type="alphanumeric"
        />
      </View>
      <Button buttonText="Submit" onPress={handleValidate} />
    </ScrollView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: COLORS.gray[600],
    marginVertical: 12,
    textAlign: "center",
  },
  otpContainer: {
    marginVertical: 30,
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
