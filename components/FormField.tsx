import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  KeyboardTypeOptions,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { useForm, Controller, Control } from "react-hook-form";

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  name: any;
  control: Control<any>;
  error: string | undefined;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
}
const FormField = ({
  label,
  icon,
  placeholder,
  name,
  control,
  error,
  secureTextEntry,
  keyboardType,
}: FormFieldProps) => {
  return (
    <View style={styles.formField}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon}
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <TextInput
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              style={styles.input}
              placeholderTextColor={COLORS.gray[600]} // Change placeholder text color
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  formField: {
    gap: 10,
    marginBottom: 20,
  },
  label: {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: COLORS.gray[300],
    opacity: 0.4,
    padding: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  input: {
    fontWeight: "bold",
    color: COLORS.gray[900],
    width: "100%",
    paddingVertical: 10,
  },
  error: {
    color: COLORS.danger,
    fontWeight: "bold",
  },
});

export default FormField;
