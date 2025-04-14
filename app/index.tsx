import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "@/constants/Colors";
import Button from "@/components/Button";
import AuthModal from "@/components/AuthModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheetComponent from "@/components/BottomSheetComponent";
import Logo from "@/components/Logo";

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
      <View style={styles.headerSection}>
        <View style={styles.headerContainer}>
          <Text
            style={[styles.headerText, { fontSize: 30, fontWeight: "400" }]}
          >
            Tawsela
          </Text>
          <Text
            style={[styles.headerText, { fontSize: 40, fontWeight: "500" }]}
          >
            Home Delivery
          </Text>
        </View>
        <Text style={styles.subHeader}>
          A seamless and fast way to satisfy your hunger
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <Button
          buttonText="Create an account"
          onPress={() => {
            setState("signup");
            setFirstRender(true);
            bottomSheetRef.current?.present();
          }}
          type="secondary"
        />
        <View style={styles.row}>
          <Text style={{ fontSize: 15 }}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              setState("login");
              setFirstRender(true);
              bottomSheetRef.current?.present();
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerSection: {
    marginTop: -60,
    gap: 10,
    paddingHorizontal: 16,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: COLORS.secondary,
  },
  subHeader: {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 14,
  },
  actionContainer: {
    marginTop: -30,
    width: "90%",
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

export default WelcomePage;
