import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { COLORS } from "@/constants/Colors";
import Logo from "@/components/Logo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import SignupModal from "@/components/SignupModal";
import RegisterModal from "@/components/RegisterModal";
import LoginModal from "@/components/LoginModal";
import VerificationModal from "@/components/VerificationModal";

const WelcomePage = () => {
  const signupRef = useRef<BottomSheetModal>(null);
  const VerificationRef = useRef<BottomSheetModal>(null);
  const loginRef = useRef<BottomSheetModal>(null);
  const registerRef = useRef<BottomSheetModal>(null);
  const openModal = (state: string) => {
    if (state === "signup") {
      signupRef.current?.present();
      VerificationRef.current?.dismiss();
      loginRef.current?.dismiss();
      registerRef.current?.dismiss();
    }
    if (state === "verification") {
      VerificationRef.current?.present();
      registerRef.current?.dismiss();
      signupRef.current?.dismiss();
      loginRef.current?.dismiss();
    }
    if (state === "login") {
      loginRef.current?.present();
      signupRef.current?.dismiss();
      VerificationRef.current?.dismiss();
      registerRef.current?.dismiss();
    }

    if (state === "register") {
      registerRef.current?.present();
      signupRef.current?.dismiss();
      VerificationRef.current?.dismiss();
      loginRef.current?.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SignupModal ref={signupRef} openModal={openModal} />
      <VerificationModal ref={VerificationRef} openModal={openModal} />

      <LoginModal ref={loginRef} openModal={openModal} />
      <RegisterModal ref={registerRef} />
      <Logo />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>The experience of buying food quickly</Text>
        <Text style={styles.subHeader}>
          A seamless and fast way to satisfy your hunger
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <Button
          buttonText="Sign Up"
          onPress={() => openModal("signup")}
          type="secondary"
        />
        <Button
          buttonText="Login"
          onPress={() => openModal("login")}
          type="tertiary"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  headerContainer: {
    gap: 10,
  },
  header: {
    color: COLORS.gray[100],
    fontSize: 35,
    fontWeight: "bold",
  },
  subHeader: {
    color: COLORS.gray[500],
    fontWeight: "bold",
    fontSize: 14,
  },
  actionContainer: { width: "100%", paddingHorizontal: 16, gap: 16 },
});

export default WelcomePage;
