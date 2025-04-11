import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import Logo from "@/components/Logo";

const WelcomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>The experience of buying food quickly</Text>
        <Text style={styles.subHeader}>
          A seamless and fast way to satisfy your hunger
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.secondary }]}
        >
          <Text style={[styles.actionText, { color: COLORS.white }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.gray[100] }]}
        >
          <Text style={[styles.actionText, { color: COLORS.gray[900] }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerContainer: {
    gap: 10,
  },
  header: {
    color: COLORS.gray[100],
    fontSize: 35,
    fontWeight: "bold",
  },
  subHeader: {
    color: COLORS.gray[500],
    fontWeight: "bold",
    fontSize: 14,
  },
  actionContainer: { width: "100%", paddingHorizontal: 16, gap: 16 },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
  },
  actionText: {
    fontWeight: "bold",
  },
});

export default WelcomePage;
