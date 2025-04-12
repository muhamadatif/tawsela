import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
// import { encryptKey, decryptKey } from "@/utils/lib/secureStorage";
import { Ionicons } from "@expo/vector-icons";
import OTPComponent from "./OtpInput";
import { COLORS } from "@/constants/Colors";

const PasskeyModal = ({
  visible,
  setVisible,
  openModal,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: (state: string) => void;
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleClose = () => {
    setVisible(false);
  };

  const handleValidate = async () => {
    const otpString = otp.join("");

    if (otpString) {
      setVisible(false);
      openModal("register");
    } else {
      setError("Invalid otp, please try again.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleClose} style={styles.closeIcon}>
            <Ionicons name="close" color={COLORS.white} size={16} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.title}>Enter the Verification Code</Text>
          </View>
          <Text style={styles.description}>
            Please enter the verification code that was sent to your phone
          </Text>
          <OTPComponent otp={otp} setOtp={setOtp} />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleValidate}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PasskeyModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 10,
    position: "relative",
    justifyContent: "center",
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
  closeIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: COLORS.gray[600],
    marginVertical: 12,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 12,
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
