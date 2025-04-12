import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef, useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FormField from "./FormField";
import { Checkbox } from "react-native-paper";
import Button from "./Button";
import BottomSheetComponent from "./BottomSheetComponent";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  openModal: (state: string) => void;
};
type Ref = BottomSheetModal;

const LoginModal = forwardRef<Ref, Props>(({ openModal }, ref) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <BottomSheetComponent ref={ref}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome back!</Text>
          <Text style={styles.subHeader}>
            See the list of likes of your food to order
          </Text>
        </View>
        <View style={styles.form}>
          <FormField
            label={"Email*"}
            icon={<Ionicons name="mail-outline" size={16} />}
            placeholder="Enter your email..."
            value={email}
            setValue={setEmail}
          />
          <FormField
            label={"password*"}
            icon={<Ionicons name="lock-closed-outline" size={16} />}
            placeholder="Enter your password..."
            value={password}
            setValue={setPassword}
          />
          <View style={styles.row}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={rememberMe ? "checked" : "unchecked"}
                onPress={() => setRememberMe(!rememberMe)}
                color={COLORS.primary}
              />
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password</Text>
            </TouchableOpacity>
          </View>
          <Button buttonText="Login" onPress={() => console.log("hi")} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.gray[500], fontWeight: "600" }}>
            Don&apos;t have any account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              openModal("signup");
            }}
            style={{ padding: 5 }}
          >
            <Text
              style={{
                fontWeight: "900",
                color: COLORS.primary,
                fontSize: 16,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BottomSheetComponent>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    gap: 10,
    marginBottom: 50,
  },
  header: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 30,
  },
  subHeader: {
    color: COLORS.gray[500],
    fontWeight: "bold",
  },
  form: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    color: COLORS.gray[500],
    fontSize: 16,
  },
  forgotPassword: { fontSize: 16, color: COLORS.secondary, fontWeight: "bold" },
});

export default LoginModal;
