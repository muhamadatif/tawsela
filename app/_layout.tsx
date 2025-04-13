import "react-native-reanimated";
import "react-native-gesture-handler";

import { Stack, useNavigation } from "expo-router";
import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Alert, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              presentation: "modal",
              headerTitle: "",
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              presentation: "fullScreenModal",
              headerTitle: "",
              headerTransparent: true,
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
