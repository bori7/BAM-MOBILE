import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import React, { ReactElement, useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";

const SpeakerModal = () => {
  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity style={styles.modalImage} onPress={() => {}}>
          <Feather name="x" size={24} color={COLORS.Light.colorOne} />
        </TouchableOpacity>
        <Text style={styles.modalHeaderText}>About Exchange Rates</Text>
      </View>
      <Text style={styles.mr3}>
        These exhange rates are provided by independent third parties who handle
        fund conversions at the prevailing parallel rates and are not set, or
        controlled or by Rise. They are subject to change based on market
        trends.
      </Text>
    </>
  );
};

export default SpeakerModal;

const styles = StyleSheet.create({
  modalHeader: {
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalImage: {
    // borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: COLORS.Light.colorSeven,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 35,
  },
  modalHeaderText: {
    textAlign: "center",
    // borderWidth: 1,
    fontSize: SIZES.sizeEight,
    fontWeight: "400",
  },
  mr3: {
    marginVertical: 25,
    color: COLORS.Light.colorOne,
    textAlign: "center",
  },
});
