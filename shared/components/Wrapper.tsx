import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { RootState, AppDispatch } from "../../store";
import { COLORS, SIZES } from "../../constants/Colors";

type props = {
  child: any;
};

export default function Wrapper({ child }: props) {
  const toast = useToast();

  const Toaster = (
    type = "success",
    message = "Rise Auth...",
    onShownFunc = () => {}
  ) => {
    console.log("Toast type: ", type, " via Wrapper");
    console.log("Toast message: ", message, " via Wrapper");

    // console.log("Toast ", toast);

    if (toast !== undefined && Object.keys(toast).length) {
      toast?.show(message, {
        type: type === "error" ? "danger" : type,
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
        textStyle: {
          fontSize: SIZES.sizeSix,
          fontWeight: "500",
          justifyContent: "center",
          color:
            type === "success"
              ? COLORS.Light.colorOne
              : COLORS.Light.colorThree,
          marginVertical: 2,
        },
        onClose: () => {
          console.log("Toast Hidden via Wrapper");
          onShownFunc();
        },
      });
    }
  };

  // const userState = useSelector((state: RootState) => state.user);
  // const { userError, userMessage, userData } = userState;

  // const planState = useSelector((state: RootState) => state.plan);
  // const { planError, planMessage } = planState;

  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (userError !== null) {
  //     Toaster("error", userError?.message, () => {});
  //   }
  //   if (userMessage) {
  //     Toaster("success", userMessage, () => {});
  //   }

  //   if (planError !== null) {
  //     Toaster("error", planError?.message, () => {});
  //   }
  //   if (planMessage) {
  //     Toaster("success", planMessage, () => {});
  //   }
  // }, [userError, userMessage, planError, planMessage]);

  useEffect(() => {}, []);

  return (
    <View style={[{ height: "100%" }]}>
      <View style={{ height: "100%" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={5}
        >
          <View style={{ height: "100%", width: "100%" }}>{child}</View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
