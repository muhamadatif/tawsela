import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FormField from "./FormField";
import Button from "./Button";

import { ScrollView } from "react-native-gesture-handler";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import Checkbox from "./Checkbox";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { useRouter } from "expo-router";

const Login = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isKeyboardVisible = useKeyboardVisibility();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: any) => {
    const collectedformData = { ...formData, rememberMe: rememberMe };
    const res = await fetch("http://www.domain.com/register/sen-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collectedformData),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/home");
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
        <Text style={styles.subHeader}>
          See the list of likes of your food to order
        </Text>
      </View>
      <View style={styles.form}>
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
        />
        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onToggle={setRememberMe}
        />

        <Button buttonText="Login" onPress={handleSubmit(onSubmit)} />
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
            setState("signup");
          }}
          style={{ padding: 5 }}
        >
          <Text
            style={{
              fontWeight: "900",
              color: COLORS.primaryDark,
              fontSize: 16,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
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
    marginBottom: 50,
  },
  header: {
    color: COLORS.secondary,
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

export default Login;
