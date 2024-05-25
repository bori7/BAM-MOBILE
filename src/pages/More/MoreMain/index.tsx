import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";
import { Text, View } from "@components/Themed";
import { COLORS, IMAGES, SIZES } from "@constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/index";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { MoreProps, MoreRoutes } from "@shared/const/routerMore";
import {
  CalendarHeartSVG,
  HandsPrayingSVG,
  MoreAboutSVG,
  MoreCreditCardSVG,
  MoreGivingSVG,
  MoreNotesOutlineSVG,
  MoreProfileSVG,
  MoreSettingSVG,
  MoreSupportSVG,
} from "@shared/components/SVGS";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootScreenProps, RootRoutes } from "@shared/const/routerRoot";
import { NotesRoutes } from "@shared/const/routerNotes";
import { DevotionalRoutes } from "@shared/const/routerDevotional";

export type MoreContentType = {
  icon: ReactNode;
  name: string;
  onPressFunc: () => void;
};
// type NavigationProps = MoreProps<MoreRoutes.MoreMain>;

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.MoreMain>,
  RootScreenProps<RootRoutes.More>
>;

const MoreMain: React.FC<NavigationProps> = ({ navigation, route }) => {
  const userState = useSelector((state: RootState) => state.user);
  const { userData,userImageBase64 } = userState;

  const moreContent: MoreContentType[] = [
    {
      icon: (userData?.image || userImageBase64) ? (
        <Image source={{ uri:  userData?.image || userImageBase64 }} style={styles.facecapture} />
      ) : (
        <MoreProfileSVG />
      ),
      name: "Your Profile",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.More, {
          screen: MoreRoutes.Profile,
          params: undefined,
        });
      },
    },
    {
      icon: <MoreCreditCardSVG />,
      name: "Subscription",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.More, {
          screen: MoreRoutes.SubscriptionMain,
          params: undefined,
        });

        // navigation?.navigate(MoreRoutes.SubscriptionMain);
      },
    },
    {
      icon: <CalendarHeartSVG />,
      name: "Memory Verse",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.More, {
          screen: MoreRoutes.VOD,
          params: undefined,
        });
      },
    },
    {
      icon: <MoreNotesOutlineSVG />,
      name: "Notes",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.Notes, {
          screen: NotesRoutes.NotesMain,
          params: undefined,
        });
        navigation.setOptions({ title: "My Notes" });
      },
    },
    {
      icon: <HandsPrayingSVG />,
      name: "Prayers",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.More, {
          screen: MoreRoutes.Prayer,
          params: undefined,
        });
      },
    },
    {
      icon: <MoreGivingSVG />,
      name: "Donation",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.More, {
          screen: MoreRoutes.Give,
          params: undefined,
        });
      },
    },
    {
      icon: <MoreAboutSVG />,
      name: "About",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.Devotional, {
          screen: DevotionalRoutes.AboutDevotional,
        });
      },
    },
    {
      icon: <MoreSupportSVG />,
      name: "Support",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.More, {
          screen: MoreRoutes.Support,
          params: undefined,
        });
      },
    },
    {
      icon: <MoreSettingSVG />,
      name: "Settings",
      onPressFunc: () => {
        navigation?.navigate(RootRoutes.More, {
          screen: MoreRoutes.Settings,
          params: undefined,
        });
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
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
              <Text style={styles.headerC1t1}>More</Text>
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
                    <TouchableOpacity style={styles.iC1t1}>
                      {opt?.icon}
                    </TouchableOpacity>
                    <Text style={styles.iC1t2}>{opt.name}</Text>
                  </View>
                  <Text style={styles.iC2}>
                    <Entypo
                      name="chevron-thin-right"
                      size={24}
                      color={COLORS.Light.hashHomeBackGroundL3}
                    />
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default MoreMain;

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
    paddingHorizontal: "8%",
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
    fontSize: SIZES.sizeNine,
    fontWeight: "600",
    // marginLeft: "2%",
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
    borderRadius: 14,
    // borderWidth: 1,
    marginVertical: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: COLORS.Light.hashHomeBackGroundL3,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.65,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 5,
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
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    // color: COLORS.Light.deeperGreyColor,
  },
  iC2: {},
  facecapture: {
    // marginVertical: 5,
    height: 30,
    width: 30,
    // padding: 5,
    // borderWidth: 1,
    // borderColor: COLORS.Light.colorSixteen,
    // justifyContent: "space-between",
    // borderWidth: 1,
    borderRadius: 15,
  },
});
