import React from "react";
import { createNavigationContainerRef } from "@react-navigation/native";
import { View } from "react-native";

export const navigationRef = createNavigationContainerRef();

const InactivityWrapper = ({ children }: any) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};

export default InactivityWrapper;
