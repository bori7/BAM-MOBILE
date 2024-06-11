import React, { useEffect, useState } from "react";
import { Text, View } from "@components/Themed";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants/Colors";

type IProps = {
  text: string;
  title: string;
};
const SearchDevotional = ({ text, title }: IProps) => {
  return (
    <>
      <Text style={styles.contentB2t1}>{text}</Text>
      <Text style={styles.contentB2t2}>{title}</Text>
    </>
  );
};

export default SearchDevotional;

const styles = StyleSheet.create({
  contentB2t1: {
    lineHeight: 24,
    marginVertical: "4%",
    color: COLORS.Light.gray,
    fontSize: SIZES.sizeSixB,
    fontWeight: "500",
  },
  contentB2t2: {
    fontSize: SIZES.sizeSeven,
    fontWeight: "600",
  },
});
