import React, { useEffect, useRef, useState } from "react";

import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "./Themed";
import { COLORS } from "../constants/Colors";
import { Octicons } from "@expo/vector-icons";

interface Iprops {
  code: string;
  setCode: any;
  maximumLength: number;
  setIsPinReady: any;
}

const OtpInput: React.FC<Iprops> = ({
  code,
  setCode,
  maximumLength,
  setIsPinReady,
}) => {
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef<any>(null);

  const BoxDigit = (_: any, index: number) => {
    const secure = true;
    const emptyInput = "";
    const digit = code[index] || emptyInput;
    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    useEffect(() => {
      setIsPinReady(code.length === maximumLength);
      return () => {
        setIsPinReady(false);
      };
    }, [code]);

    return (
      <View
        style={[
          styles.splitBox,
          {
            borderColor: digit
              ? COLORS.Light.colorOne
              : COLORS.Light.colorTwentySix,
          },
        ]}
        key={index}
      >
        <Text style={styles.splitBoxText}>
          {secure
            ? digit && (
                <Octicons
                  name="dot-fill"
                  size={15}
                  color={COLORS.Light.colorTwentyFive}
                />
              )
            : digit}
        </Text>
      </View>
    );
  };

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };
  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };
  return (
    <View style={styles.otpInputContainer}>
      <View style={styles.splitOTPBoxesContainer}>
        {boxArray.map(BoxDigit)}
      </View>

      {/* <TextInput
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
        keyboardType="numeric"
        // secureTextEntry
        style={styles.textInputHidden}
      /> */}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  otpInputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInputHidden: {
    width: "100%",
    borderColor: COLORS.Light.colorTwentySix,
    position: "absolute",
    // opacity: 0,
  },
  splitOTPBoxesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  splitBox: {
    borderRadius: 5,
    padding: 10,
    minWidth: 50,
    minHeight: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splitBoxText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: COLORS.Light.colorTwentyFive,
  },
  splitBoxesFocused: {
    borderBottomWidth: 2,
    borderRadius: 5,
    padding: 12,
    minWidth: 40,
    minHeight: 40,
    borderColor: COLORS.Light.colorOne,
  },
  dot: {
    fontWeight: "900",
  },
});
