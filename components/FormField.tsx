import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const FormField = ({
  label,
  icon,
  placeholder,
  value,
  setValue,
}: FormFieldProps) => {
  return (
    <View style={styles.formField}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon}
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor={COLORS.gray[600]} // Change placeholder text color
          value={value}
          onChangeText={setValue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formField: {
    gap: 10,
    marginBottom: 20,
  },
  label: {
    color: COLORS.primary,
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
  },
});

export default FormField;
