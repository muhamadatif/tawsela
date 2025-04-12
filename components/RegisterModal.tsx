import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef, useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FormField from "./FormField";
import Button from "./Button";
import BottomSheetComponent from "./BottomSheetComponent";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";

type Ref = BottomSheetModal;

const RegisterModal = forwardRef<Ref>((props, ref) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <BottomSheetComponent ref={ref}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome back!</Text>
          <Text style={styles.subHeader}></Text>
        </View>
        <View style={styles.form}>
          <FormField
            label={"Full name*"}
            icon={<Ionicons name="person-outline" size={16} />}
            placeholder="Enter your full name..."
            value={fullname}
            setValue={setFullname}
          />
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

          <Button buttonText="Register" onPress={() => console.log("hi")} />
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
    marginBottom: 10,
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

export default RegisterModal;
