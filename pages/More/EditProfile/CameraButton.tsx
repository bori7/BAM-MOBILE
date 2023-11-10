import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { CameraIconSVG } from "../../../shared/components/SVGS";
import { COLORS } from "../../../constants/Colors";

type IProps = {
  onPressFunc: () => void;
};
const CameraButton = ({ onPressFunc }: IProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressFunc}>
      <CameraIconSVG />
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
