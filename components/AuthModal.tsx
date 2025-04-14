import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Login from "./Login";
import Signup from "./Signup";
import Register from "./Register";
import BottomSheetComponent from "./BottomSheetComponent";
import Verification from "./Verification";

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  firstRender: boolean;
  setFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthModal = (props: Props) => {
  const { state, setState, firstRender, setFirstRender } = props;
  const [mobile, setMobile] = useState("");
  const { width } = Dimensions.get("window");

  const loginOpacity = useSharedValue(state === "login" ? 1 : 0);
  const signupOpacity = useSharedValue(state === "signup" ? 1 : 0);
  const verificationOpacity = useSharedValue(state === "verification" ? 1 : 0);
  const registerOpacity = useSharedValue(state === "register" ? 1 : 0);

  const opacityMap = useMemo(
    () => ({
      login: loginOpacity,
      signup: signupOpacity,
      verification: verificationOpacity,
      register: registerOpacity,
    }),
    []
  );

  useEffect(() => {
    if (firstRender) {
      if (state && opacityMap[state as keyof typeof opacityMap]) {
        opacityMap[state as keyof typeof opacityMap].value = 1;
      }
      setFirstRender(false);
    }
  }, [firstRender]);
  useEffect(() => {
    if (firstRender) return;
    const keys = Object.keys(opacityMap) as (keyof typeof opacityMap)[];
    keys.forEach((key) => {
      opacityMap[key].value = withTiming(state === key ? 1 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    });
  }, [state]);

  const loginStyle = useAnimatedStyle(() => ({
    opacity: loginOpacity.value,
    transform: [{ translateX: (1 - loginOpacity.value) * width }],
  }));

  const signupStyle = useAnimatedStyle(() => ({
    opacity: signupOpacity.value,
    transform: [{ translateX: (1 - signupOpacity.value) * width }],
  }));
  const verificationStyle = useAnimatedStyle(() => ({
    opacity: verificationOpacity.value,
    transform: [{ translateX: (1 - verificationOpacity.value) * width }],
  }));
  const registerStyle = useAnimatedStyle(() => ({
    opacity: registerOpacity.value,
    transform: [{ translateX: (1 - registerOpacity.value) * width }],
  }));

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contentContainer}>
        {state === "login" && (
          <Animated.View style={[styles.animatedView, loginStyle]}>
            <Login setState={setState} />
          </Animated.View>
        )}

        {state === "signup" && (
          <Animated.View style={[styles.animatedView, signupStyle]}>
            <Signup setState={setState} setMobile={setMobile} />
          </Animated.View>
        )}
        {state === "verification" && (
          <Animated.View style={[styles.animatedView, verificationStyle]}>
            <Verification setState={setState} mobile={mobile} />
          </Animated.View>
        )}
        {state === "register" && (
          <Animated.View style={[styles.animatedView, registerStyle]}>
            <Register />
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

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
