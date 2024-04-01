import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { Text, View } from "../../components/Themed";
import { COLORS } from "../../constants/Colors";

export const DetailModal = ({
  text,
  children,
  xstyle,
  bstyle,
}: {
  text?: string;
  children?: any;
  xstyle?: StyleProp<ViewStyle>;
  bstyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles.main, xstyle]}>
      <View style={[styles.container, bstyle]}>
        <View style={[styles.triangle]}></View>
        {text && <Text style={styles.text}>{text}</Text>}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    top: 45,
  },
  container: {
    backgroundColor: COLORS.Light.colorOne,
    width: 63,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 15,
  },
  text: {
    color: COLORS.Light.background,
  },
  triangle: {
    position: "absolute",
    width: 0,
    height: 0,
    top: -10,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: COLORS.Light.colorOne,
  },
});
