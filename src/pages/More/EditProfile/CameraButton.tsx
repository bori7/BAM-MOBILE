import {
  Image,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { CameraIconSVG } from "../../../shared/components/SVGS";
import { COLORS } from "../../../constants/Colors";

type IProps = {
  onPressFunc: () => void;
  xstyle?: StyleProp<ViewStyle>;
  height?: number;
  width?: number;
  strokeColor?: string;
};
const CameraButton = ({
  onPressFunc,
  xstyle = undefined,
  height,
  width,
  strokeColor,
}: IProps) => {
  return (
    <TouchableOpacity
      style={[xstyle || styles.container]}
      onPress={onPressFunc}
    >
      <CameraIconSVG height={height} width={width} color={strokeColor} />
    </TouchableOpacity>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "7%",
    right: "33%",
    backgroundColor: COLORS.Light.background,
    borderRadius: 50,
    padding: 8,
    borderWidth: 2,
    borderColor: COLORS.Light.hashHomeBackGroundL3,
  },
});
