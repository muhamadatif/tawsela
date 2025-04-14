import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "@/constants/Colors";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import AuthModal from "@/components/AuthModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetComponent from "@/components/BottomSheetComponent";

type Ref = BottomSheetModal;

const WelcomePage = () => {
  const [state, setState] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  const bottomSheetRef = useRef<Ref>(null);

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheetComponent ref={bottomSheetRef}>
        <AuthModal
          state={state}
          setState={setState}
          firstRender={firstRender}
          setFirstRender={setFirstRender}
        />
      </BottomSheetComponent>
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
          onPress={() => {
            setState("signup");
            setFirstRender(true);
            bottomSheetRef.current?.present();
          }}
          type="secondary"
        />
        <Button
          buttonText="Login"
          onPress={() => {
            setState("login");
            setFirstRender(true);
            bottomSheetRef.current?.present();
          }}
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
    paddingHorizontal: 16,
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
