import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "@/constants/Colors";
import Logo from "@/components/Logo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import AuthModal from "@/components/AuthModal";
import SignupModal from "@/components/SignupModal";
import RegisterModal from "@/components/RegisterModal";
import LoginModal from "@/components/LoginModal";

const WelcomePage = () => {
  // const [state, setState] = useState("");

  const signupRef = useRef<BottomSheetModal>(null);
  const loginRef = useRef<BottomSheetModal>(null);
  const registerRef = useRef<BottomSheetModal>(null);
  const openModal = (state: string) => {
    state === "signup" && signupRef.current?.present();
    state === "login" && loginRef.current?.present();
    state === "register" && registerRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <AuthModal ref={bottomSheetRef} state={state} setState={setState} /> */}
      <SignupModal ref={signupRef} openModal={openModal} />
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
