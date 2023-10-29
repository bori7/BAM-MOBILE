import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

import React, { ReactElement, useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
const TextFormatModal = () => {
  const [ticked, setTicked] = useState<boolean>(false);
  return (
    <View style={styles.modalHeader}>
      <View style={styles.lid} />
      <View style={styles.r1}>
        <TouchableOpacity style={styles.r1a}>
          <Text style={styles.r1at}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.r1a}>
          <Text style={styles.r1bt}>A</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.r2}>
        <View style={styles.r2a}>
          <Text style={styles.r2at1}>
            <Ionicons name="moon" size={30} color={COLORS.Light.colorFour} />
          </Text>
          <Text style={styles.r2at2}>Dark Mode</Text>
        </View>

        <Switch
          trackColor={{
            true: COLORS.Light.colorOne,
            false: COLORS.Light.tickGray,
          }}
          thumbColor={COLORS.Light.background}
          style={styles.r2b}
          onValueChange={() => {
            setTicked(!ticked);
          }}
          value={ticked}
          ios_backgroundColor={COLORS.Light.tickGray}
        />
      </View>
    </View>
  );
};

export default TextFormatModal;

const styles = StyleSheet.create({
  modalHeader: {
    // borderWidth: 1,
    // flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  lid: {
    backgroundColor: COLORS.Light.tickGray,
    height: 7,
    width: 60,
    borderRadius: 10,
    marginBottom: 30,
  },
  r1: {
    height: 55,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  r1a: {
    backgroundColor: COLORS.Light.hashBackGroundL3,
    width: "49%",
    alignItems: "center",
    justifyContent: "center",
  },
  r1at: {
    fontSize: SIZES.sizeEight,
  },
  r1b: {},
  r1bt: {
    fontWeight: "600",
    fontSize: SIZES.sizeNineB,
  },
  r2: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 15,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  r2a: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  r2at1: {
    marginRight: 20,
  },
  r2at2: {
    fontWeight: "600",
    fontSize: SIZES.sizeEightB,
  },
  r2b: {
    // marginRight: 20,
  },
});
