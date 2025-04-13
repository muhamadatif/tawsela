import React, { forwardRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import { encryptKey, decryptKey } from "@/utils/lib/secureStorage";

import { COLORS } from "@/constants/Colors";
import BottomSheetComponent from "./BottomSheetComponent";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { OtpInput } from "react-native-otp-entry";

type Props = { openModal: (state: string) => void };
type Ref = BottomSheetModal;

const VerificationModal = forwardRef<Ref, Props>(({ openModal }, ref) => {
  const [otp, setOtp] = useState("");

  const handleValidate = () => {
    otp && openModal("register");
  };
  return (
    <BottomSheetComponent
      ref={ref}
      //  onDismiss={() => reset()}
    >
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
          <OtpInput numberOfDigits={6} onTextChange={(text) => setOtp(text)} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleValidate}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </BottomSheetComponent>
  );
});

export default VerificationModal;

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
    backgroundColor: COLORS.primary,
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
