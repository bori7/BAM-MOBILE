import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text, View } from "../../../components/Themed";
import {
  CheckMarkSVG,
  HandsPrayingSVG,
  SuccessSVG,
} from "../../../shared/components/SVGS";
import { COLORS, SIZES } from "../../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { PrayerProps } from "../../../shared/types/slices";

type IProps = {
  prayers: PrayerProps[];
  onPressPrayerFunc: (uid: string) => void;
};

const AnsweredList = ({ prayers, onPressPrayerFunc }: IProps) => {
  return (
    <>
      <View
        style={[
          styles.container,
          prayers?.length > 0 && { marginVertical: 0, paddingVertical: 20 },
        ]}
      >
        {prayers?.length == 0 && (
          <>
            <CheckMarkSVG />
            <Text style={styles.textEmpty}>
              Your answered prayers will be displayed here
            </Text>
          </>
        )}
        {prayers?.length > 0 &&
          prayers.map((prayer, idx) => (
            <TouchableOpacity
              style={styles.r3}
              key={idx}
              onPress={() => {
                onPressPrayerFunc(prayer.uid);
              }}
            >
              <Text style={styles.r3t1}>{prayer?.title}</Text>
              <Text style={styles.r3t2} numberOfLines={2} ellipsizeMode="tail">
                {prayer?.text}
              </Text>
              {/* <Text style={styles.r3t3}>{note?.datetime}</Text> */}
              <Text style={styles.r3t3}>
                {prayer?.time} {prayer?.date}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </>
  );
};

export default AnsweredList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginVertical: "40%",
    paddingVertical: "20%",
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 70,
    // marginRight: 10,
    width: "100%",
    // paddingHorizontal: "10%",
    // borderWidth: 1,
  },
  textEmpty: {
    textAlign: "center",
    color: COLORS.Light.gray,
    fontSize: SIZES.sizeSixC,
    marginTop: 20,
    fontWeight: "400",
  },
  r3: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: COLORS.Light.hashBackGroundL2,
    marginBottom: 30,
  },
  r3t1: {
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEight,
    fontWeight: "500",
    marginVertical: 10,
  },
  r3t2: {
    color: COLORS.Light.gray,
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    marginVertical: 8,
  },
  r3t3: {
    color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    marginVertical: 8,
  },
});
