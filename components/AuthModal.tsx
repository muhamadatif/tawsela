import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "@/constants/Colors";
import Login from "./Login";
import Signup from "./Signup";
import Register from "./Register";
import BottomSheetComponent from "./BottomSheetComponent";

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

type Ref = BottomSheetModal;
const AuthModal = forwardRef<Ref, Props>((props, ref) => {
  const { state, setState } = props;
  const loginOpacity = useSharedValue(state === "login" ? 1 : 0);
  const signupOpacity = useSharedValue(state === "signup" ? 1 : 0);
  const registerOpacity = useSharedValue(state === "register" ? 1 : 0);

  useEffect(() => {
    if (state === "login") {
      loginOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      signupOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      registerOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    } else if (state === "signup") {
      loginOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      signupOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      registerOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    } else if (state === "register") {
      loginOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      signupOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      registerOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [state]);

  const loginStyle = useAnimatedStyle(() => ({
    opacity: loginOpacity.value,
    // Optional: Add slight vertical movement
    transform: [{ translateX: (1 - loginOpacity.value) * 700 }],
  }));

  const signupStyle = useAnimatedStyle(() => ({
    opacity: signupOpacity.value,
    // Optional: Add slight vertical movement
    transform: [{ translateX: (1 - signupOpacity.value) * 700 }],
  }));
  const registerStyle = useAnimatedStyle(() => ({
    opacity: registerOpacity.value,
    // Optional: Add slight vertical movement
    transform: [{ translateX: (1 - registerOpacity.value) * 700 }],
  }));

  return (
    <BottomSheetComponent ref={ref}>
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.animatedView, loginStyle]}>
          <Login setState={setState} />
        </Animated.View>

        <Animated.View style={[styles.animatedView, signupStyle]}>
          <Signup setState={setState} />
        </Animated.View>
        <Animated.View style={[styles.animatedView, registerStyle]}>
          <Register />
        </Animated.View>
      </View>
    </BottomSheetComponent>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  animatedView: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
});

export default AuthModal;
