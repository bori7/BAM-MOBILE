import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";

interface Iprops {
  sendPin: () => void;
  maximumLength: number;
}

const KeyPad: React.FC<Iprops> = ({
  sendPin = () => {},
  maximumLength = 6,
}) => {
  const [pin, setPin] = useState<string>("");

  const keypad: { type: string; value: any }[] = [
    { type: "key", value: "1" },
    { type: "key", value: "2" },
    { type: "key", value: "3" },
    { type: "key", value: "4" },
    { type: "key", value: "5" },
    { type: "key", value: "6" },
    { type: "key", value: "7" },
    { type: "key", value: "8" },
    { type: "key", value: "9" },
    { type: "key", value: "." },
    { type: "key", value: "0" },
    {
      type: "delete",
      value: <Ionicons name="backspace-outline" size={30} />,
    },
  ];

  const submitPin = () => {};

  useEffect(() => {
    console.log(pin);
    sendPin(pin);
  }, [pin]);
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        contentContainerStyle={styles.keyPadContent}
        data={keypad}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.keyContainer]}
              onPress={() => {
                if (item.type === "delete") {
                  setPin(pin?.substring(0, pin.length - 1) || "");
                } else if (pin.length == maximumLength) {
                  submitPin();
                } else if (pin.length < maximumLength) {
                  setPin(pin + item.value.toString());
                }
              }}
            >
              <Text style={styles.key}>{item.value}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default KeyPad;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
  },
  keyPadContent: {
    display: "flex",
    alignItems: "center",
  },
  keyContainer: {
    borderRadius: 50,
    width: 70,
    height: 70,
    margin: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.Light.colorSeven,
  },
  key: {
    fontSize: 30,
    color: COLORS.Light.colorOne,
    fontWeight: "600",
  },
});
