import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MoreProps, MoreRoutes } from "../../../shared/const/routerMore";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootScreenProps, RootRoutes } from "../../../shared/const/routerRoot";

type DarkModeType = {
  darkModeOption: "UDS" | "ON" | "OFF";
  name: string;
  onPressFunc: () => void;
};

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.DarkMode>,
  RootScreenProps<RootRoutes.More>
>;

const DarkMode: React.FC<NavigationProps> = ({ navigation, route }) => {
  const [darkModeOption, setDarkModeOption] =
    useState<DarkModeType["darkModeOption"]>("UDS");

  const moreContent: DarkModeType[] = [
    {
      darkModeOption: "UDS",
      name: "Use device settings",
      onPressFunc: () => {
        setDarkModeOption("UDS");
      },
    },
    {
      darkModeOption: "OFF",
      name: "Off",
      onPressFunc: () => {
        setDarkModeOption("OFF");
      },
    },
    {
      darkModeOption: "ON",
      name: "On",
      onPressFunc: () => {
        setDarkModeOption("ON");
      },
    },
  ];
  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={[styles.headerContainer, styles.headerShadow]}>
          <View style={styles.header}>
            <View style={styles.headerC1}>
              <TouchableOpacity
                style={styles.headerRC1}
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
              <Text style={styles.headerC1t1}>Dark Mode</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <View style={styles.listContainer}>
              {moreContent?.map((opt, idx) => (
                <TouchableOpacity
                  style={styles.listItem}
                  key={idx}
                  onPress={() => {
                    opt.onPressFunc();
                  }}
                >
                  <View style={styles.iC1}>
                    <Text style={styles.iC1t2}>{opt.name}</Text>
                  </View>

                  <View style={styles.r3c2}>
                    <MaterialIcons
                      name={
                        opt.darkModeOption === darkModeOption
                          ? "radio-button-on"
                          : "radio-button-unchecked"
                      }
                      size={28}
                      color={COLORS.Light.colorOne}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default DarkMode;

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
    paddingHorizontal: "5%",
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
    alignItems: "center",
  },
  headerC1: {
    // borderWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    // alignItems: "flex-start",
  },
  headerC1t1: {
    fontSize: SIZES.sizeEightB,
    fontWeight: "600",
    // marginLeft: "2%",
    // marginTop: 10,
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
  headerRC1: {
    marginRight: "6%",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
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
  listContainer: {
    width: "96%",
  },
  listItem: {
    backgroundColor: COLORS.Light.background,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 15,
    // borderRadius: 12,
    // borderWidth: 1,
    marginVertical: 10,
    alignItems: "center",
    width: "100%",
    borderColor: COLORS.Light.hashHomeBackGroundL3,
  },
  iC1: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // width: "38%",
    alignItems: "center",
  },
  iC1t1: {
    marginRight: "8%",
  },
  iC1t2: {
    fontSize: SIZES.sizeSevenB,
    fontWeight: "400",
    // color: COLORS.Light.deeperGreyColor,
  },
  iC2: {},

  r3c2: {},
});
