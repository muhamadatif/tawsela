import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { COLORS } from "@/constants/Colors";

type Props = {
  children: ReactNode;
};

type Ref = BottomSheetModal;
const BottomSheetComponent = forwardRef<Ref, Props>(({ children }, ref) => {
  const snapPoints = useMemo(() => ["75%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ borderRadius: 20, backgroundColor: COLORS.gray[100] }}
      handleIndicatorStyle={{ backgroundColor: COLORS.gray[300], width: 50 }}
    >
      <BottomSheetView style={styles.container}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default BottomSheetComponent;
