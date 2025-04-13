import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef, useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FormField from "./FormField";
import Button from "./Button";
import BottomSheetComponent from "./BottomSheetComponent";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { registerSchema, signupSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "expo-router";

type Ref = BottomSheetModal;

const RegisterModal = forwardRef<Ref>((props, ref) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    router.replace("/home");
  };

  return (
    <BottomSheetComponent ref={ref} onDismiss={() => reset()}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
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
            name="fullname"
            control={control}
            error={errors.fullname?.message}
          />
          <FormField
            label={"Email*"}
            icon={<Ionicons name="mail-outline" size={16} />}
            placeholder="Enter your email..."
            name="email"
            control={control}
            error={errors.email?.message}
          />
          <FormField
            label={"password*"}
            icon={<Ionicons name="lock-closed-outline" size={16} />}
            placeholder="Enter your password..."
            name="password"
            control={control}
            error={errors.password?.message}
            secureTextEntry
          />
          <FormField
            label={"Confirm Password*"}
            icon={<Ionicons name="lock-closed-outline" size={16} />}
            placeholder="confirm your password..."
            name="confirmPassword"
            control={control}
            error={errors.confirmPassword?.message}
            secureTextEntry
          />

          <Button buttonText="Register" onPress={handleSubmit(onSubmit)} />
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
