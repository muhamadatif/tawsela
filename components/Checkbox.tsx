import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  label: string;
  checked: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Checkbox = ({ label, checked, onToggle }: Props) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: checked ? COLORS.primary : "transparent",
    borderColor: COLORS.primary,
  }));

  const handleToggle = () => {
    scale.value = withTiming(1.1, { duration: 100 }, () => {
      scale.value = withTiming(1);
    });
    onToggle(!checked);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      <Animated.View style={[styles.checkbox, animatedStyle]}>
        {checked && <Ionicons name="checkmark" size={14} color="white" />}
      </Animated.View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: 16,
    color: COLORS.gray[700],
    fontWeight: "500",
  },
});

export default Checkbox;
