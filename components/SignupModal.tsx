import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { forwardRef, useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import FormField from "./FormField";
import Button from "./Button";
import PasskeyModal from "./PasskeyModal";
import BottomSheetComponent from "./BottomSheetComponent";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { loginSchema, signupSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  openModal: (state: string) => void;
};
type Ref = BottomSheetModal;

const SignupModal = forwardRef<Ref, Props>(({ openModal }, ref) => {
  const [visible, setVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: any) => {
    openModal("verification");
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
          <Text style={styles.header}>Welcome 👋</Text>
          <Text style={styles.subHeader}>
            Your favorite foods, just a tap away!
          </Text>
        </View>
        <View style={styles.form}>
          <FormField
            label={"Phone Number*"}
            icon={<Ionicons name="call-outline" size={16} />}
            placeholder="Enter your phone number..."
            name="phone"
            control={control}
            error={errors.phone?.message}
          />

          <View style={styles.row}></View>
          <Button buttonText="Sign Up" onPress={handleSubmit(onSubmit)} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.gray[500], fontWeight: "600" }}>
            have an account?
          </Text>
          <TouchableOpacity
            onPress={() => openModal("login")}
            style={{ padding: 5 }}
          >
            <Text
              style={{
                fontWeight: "900",
                color: COLORS.primary,
                fontSize: 16,
              }}
            >
              Login
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

export default SignupModal;
