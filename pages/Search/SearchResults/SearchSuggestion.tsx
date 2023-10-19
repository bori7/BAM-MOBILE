import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../../constants/Colors";

type IProps = {
  text: string;
};
const SearchSuggestion = ({ text }: IProps) => {
  return (
    <>
      <View style={styles.cBRC1}>
        <Text style={styles.cBRC1t1}>
          <Feather name="search" size={28} color={COLORS.Light.colorFour} />
        </Text>
        <Text style={styles.cBRC1t2}>{text}</Text>
      </View>
      <View style={styles.cBRC2}>
        <Text style={styles.cBRC2t}>
          <Feather
            name="arrow-up-left"
            size={28}
            color={COLORS.Light.colorFour}
          />
        </Text>
      </View>
    </>
  );
};

export default SearchSuggestion;

const styles = StyleSheet.create({
  contentBodyRow: {
    flexDirection: "row",
    width: "100%",
    // borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 5,
  },
  cBRC1: {
    flexDirection: "row",
    alignItems: "center",
  },
  cBRC1t1: {
    marginRight: "12%",
  },
  cBRC1t2: {
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEight,
    fontWeight: "400",
  },
  cBRC2: {},
  cBRC2t: {},
});
