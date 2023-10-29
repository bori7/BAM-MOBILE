import React, { useRef, useState } from "react";
import { Easing, StyleProp, ViewStyle } from "react-native";
import { Animated, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { View } from "../../components/Themed";
import { COLORS } from "../../constants/Colors";

export const ProgressBarButton = ({
  buttonStyle,
  cWidth,
  pad,
  setExternalProgress,
  children,
}: {
  buttonStyle: StyleProp<ViewStyle>;
  cWidth: number;
  pad: number;
  setExternalProgress: Function;
  children?: any;
}) => {
  const BUTTON_WIDTH = cWidth || 50;
  const DEVICE_WIDTH = Dimensions.get("window").width;
  const BUTTON_HEIGHT = cWidth || 50;
  const ALLOWANCE = DEVICE_WIDTH - BUTTON_WIDTH * 2;

  const position = useRef(new Animated.Value(0));
  const [percentage, setPercentage] = useState(0);

  const onHandlerStateChange = (event: {
    nativeEvent: { state: number; translationX?: any };
  }) => {
    const { translationX } = event.nativeEvent;
    let oldPosition = position?.current?._value || 0;

    let newPosition = Math.min(
      Math.max(oldPosition + translationX, pad),
      ALLOWANCE
    );

    position?.current.setValue(newPosition);

    const newPercentage = Math.round((newPosition / ALLOWANCE) * 100);
    setExternalProgress(newPercentage);
    setPercentage(newPercentage);
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.button,
            {
              width: BUTTON_WIDTH,
              height: BUTTON_HEIGHT,
              borderRadius: BUTTON_HEIGHT / 2,
            },
            { transform: [{ translateX: position?.current }] },
            buttonStyle,
          ]}
        >
          {/* <Text style={styles.buttonText}>{percentage}</Text> */}
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.Light.background,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 3,
    borderColor: COLORS.Light.colorOne,
  },
  buttonText: {
    color: COLORS.Light.colorOne,
    fontSize: 12,
    fontWeight: "500",
  },
});
