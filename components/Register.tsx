import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FormField from "./FormField";
import Button from "./Button";

import { ScrollView } from "react-native-gesture-handler";
import { registerSchema, signupSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "expo-router";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";

const Register = () => {
  const [error, setError] = useState("");
  const isKeyboardVisible = useKeyboardVisibility();

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

  const onSubmit = async (formData: any) => {
    const res = await fetch("http://www.domain.com/register/sen-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      router.replace("/home");
    }
    if (!res.ok) {
      setError(data.message);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 100 : 60 }}
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
  );
};

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

export default Register;
