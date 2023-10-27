import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { DevotionalItemProps } from "../../../shared/types/slices";
import {
  DevotionalProps,
  DevotionalRoutes,
} from "../../../shared/const/routerDevotional";
import ClockModal from "./ClockModal";
import { timeOptions } from "../../../constants/values";
import { convertTo12HourFormat } from "../../../shared/helper";

type NavigationProps = DevotionalProps<DevotionalRoutes.SettingsDevotional>;

const SettingsDevotional: React.FC<NavigationProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [ticked, setTicked] = useState<boolean>(false);
  const [devotionals, setDevotionals] = useState<DevotionalItemProps[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>();

  useEffect(() => {
    const nowTIme = new Date()
      .toLocaleTimeString("en-US", timeOptions)
      ?.toLocaleUpperCase();
    if (Platform.OS === "android") {
      setSelectedTime(convertTo12HourFormat(nowTIme));
      // console.log("selectedTime=>>", selectedTime);
    } else {
      setSelectedTime(nowTIme);
    }
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={[styles.headerContainer, styles.headerShadow]}>
          <View style={styles.header}>
            <View style={styles.headerC1}>
              <TouchableOpacity
                // style={styles.r2t}
                onPress={() => {
                  navigation?.goBack();
                }}
              >
                <Ionicons
                  name="arrow-back-sharp"
                  size={28}
                  color={COLORS.Light.colorFour}
                />
              </TouchableOpacity>
              <Text style={styles.r1t2}>Settings</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <View style={styles.fr1}>
              <Text style={styles.fr1r1}>Daily Living Devotional</Text>
              <Text style={styles.fr1r2}>Day 265 of 365 (23.4%)</Text>
              <View style={styles.fr1r3}></View>
              <TouchableOpacity style={styles.progressA}>
                <View style={[styles.progressB, { width: `${23.4}%` }]}></View>
              </TouchableOpacity>
              <Text style={styles.fr1r4}>Start Date: Jan 1, 2023</Text>
              <Text style={styles.fr1r5}>End Date: Dec 31, 2023</Text>
            </View>
            <View style={styles.fr2}>
              <Text style={styles.fr2r1}>Set Reminder</Text>
              <View style={styles.fr2r2}>
                <View style={styles.fr2r2C}>
                  <Text style={styles.fr2r2t1}>{selectedTime}</Text>
                  <TouchableOpacity style={styles.fr2r2t2}>
                    {/* <AntDesign
                      name="caretdown"
                      size={18}
                      color={COLORS.Light.colorFour}
                    /> */}
                    <ClockModal
                      pickSelectedTime={function (time: string): void {
                        setSelectedTime(time);
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <Switch
                  trackColor={{
                    true: COLORS.Light.colorOne,
                    false: COLORS.Light.tickGray,
                  }}
                  thumbColor={COLORS.Light.background}
                  style={styles.fr2r2t3}
                  onValueChange={() => {
                    setTicked(!ticked);
                  }}
                  value={ticked}
                  ios_backgroundColor={COLORS.Light.tickGray}
                />
              </View>
            </View>
            <View style={styles.fr3}>
              <Text style={styles.fr3t1}>Language</Text>
              <Text style={styles.fr3t2}>English</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SettingsDevotional;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: COLORS.Light.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // marginHorizontal: "5%",
    backgroundColor: COLORS.Light.background,
  },
  headerContainer: {
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: 10,
    paddingHorizontal: "3%",
    backgroundColor: COLORS.Light.background,
    height: "13%",
  },
  headerShadow: {
    shadowColor: COLORS.Light.deeperGreyColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 10,
    // borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerC1: {
    // borderWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  headerC1t1: {
    fontSize: SIZES.sizeNineB,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
  },
  headerC1t2: {
    fontSize: SIZES.sizeFiveC,
    fontWeight: "400",
    color: COLORS.Light.deeperGreyColor,
  },
  headerC2: {
    alignItems: "center",
    justifyContent: "center",
  },
  r1t2: {
    marginLeft: "8%",
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightB,
    fontWeight: "600",
    textAlign: "center",
  },
  bodyContainer: {
    // borderWidth: 1,
    width: "90%",
    height: "100%",
    backgroundColor: COLORS.Light.background,
    paddingBottom: "30%",
  },
  scroll: {
    // borderWidth: 1,
    width: "100%",
    marginTop: 10,
    backgroundColor: "transparent",
    paddingBottom: "10%",
  },
  scrollContent: {
    width: "100%",
    // height: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    // marginBottom: 50,
    paddingVertical: 5,
    paddingBottom: "10%",
  },

  r2t: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    width: 120,
    marginVertical: 10,
  },

  fv1: {
    marginVertical: 20,
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightB,
    fontWeight: "600",
  },
  fv2: {
    marginVertical: 30,
    lineHeight: 22,
  },
  fv3: {
    marginTop: 10,
    alignSelf: "flex-start",
    fontWeight: "400",
    fontSize: SIZES.sizeSixC,
    color: COLORS.Light.deepGreyColor,
  },
  fv4: {
    marginVertical: 10,
    // lineHeight: 22,
    width: "100%",
  },
  fr1: {
    alignSelf: "flex-start",
    marginVertical: 20,
    width: "100%",
    borderBottomColor: COLORS.Light.tickGray,
    borderBottomWidth: 1,
  },
  fr1r1: {
    marginVertical: 12,
    fontWeight: "500",
    fontSize: SIZES.sizeSixC,
  },
  fr1r2: {
    color: COLORS.Light.deepGreyColor,
    marginVertical: 8,
  },

  fr1r3: {},
  progressA: {
    width: "100%",
    backgroundColor: COLORS.Light.colorOneLightA,
    height: 8,
    borderRadius: 10,
    // borderWidth: 1,
    marginVertical: 15,
  },
  progressB: {
    backgroundColor: COLORS.Light.colorOne,
    height: 8,
    borderRadius: 10,
  },
  fr1r4: {
    color: COLORS.Light.deepGreyColor,
    marginVertical: 6,
  },
  fr1r5: {
    color: COLORS.Light.deepGreyColor,
    marginTop: 6,
    marginBottom: 20,
  },
  fr2: {
    alignSelf: "flex-start",
    marginVertical: 20,
    width: "100%",
  },
  fr2r1: {
    fontWeight: "400",
    fontSize: SIZES.sizeSeven,
    marginBottom: 22,
  },
  fr2r2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fr2r2C: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "40%",
    alignItems: "center",
  },
  fr2r2t1: {
    marginRight: 20,
    fontWeight: "500",
    fontSize: SIZES.sizeSevenB,
  },
  fr2r2t2: {},
  fr2r2t3: {
    width: 52,
  },
  fr3: {
    alignSelf: "flex-start",
    marginVertical: 20,
    borderBottomColor: COLORS.Light.tickGray,
    borderBottomWidth: 1,
    width: "100%",
  },
  fr3t1: {
    marginBottom: 15,
    fontWeight: "400",
    fontSize: SIZES.sizeSevenB,
  },
  fr3t2: {
    marginBottom: 15,
    color: COLORS.Light.deepGreyColor,
    fontSize: SIZES.sizeSixB,
  },
});
