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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { MoreProps, MoreRoutes } from "../../../shared/const/routerMore";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "../../../shared/const/routerRoot";
import { GivingPaymentMethodType } from "../../../shared/types/slices";
import { MoreContentType } from "../MoreMain";
import {
  EmailLightSVG,
  BaselineShareSVG,
  CarbonDocumnetSVG,
  UiPadlockSVG,
} from "../../../shared/components/SVGS";
import { NotesRoutes } from "../../../shared/const/routerNotes";

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.Support>,
  RootScreenProps<RootRoutes.More>
>;

const Support: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [hideOptions, setHideOptions] = useState<boolean>(false);

  const moreContent: MoreContentType[] = [
    {
      icon: <EmailLightSVG />,
      name: "Email Support",
      onPressFunc: () => {},
    },
    {
      icon: <BaselineShareSVG />,
      name: "Share Daily Answer",
      onPressFunc: () => {},
    },
    {
      icon: <CarbonDocumnetSVG />,
      name: "Terms of Service",
      onPressFunc: () => {},
    },
    {
      icon: <UiPadlockSVG />,
      name: "Privacy Policy",
      onPressFunc: () => {},
    },
  ];
  const screenNotificationState = useSelector(
    (state: RootState) => state.screenNotification
  );
  const { screenLoading } = screenNotificationState;

  // useEffect(() => {
  //   if (screenLoading && route.name === MoreRoutes.Support)
  //     setTimeout(async () => {
  //       await dispatch(screenNotificationActions.updateScreenLoading(false));
  //       navigation?.navigate(RootRoutes.Main, {
  //         screen: MainRoutes.Success,
  //         params: {
  //           mainText: "Successful",
  //           subText: "We appreciate your generosity. God bless you",
  //           btnText: "Done",
  //           toScreen: RootRoutes.More,
  //           toSubScreen: MoreRoutes.GivingHistory,
  //           toSubScreenParams: {},
  //         },
  //       });
  //       dispatch(
  //         moreActions.addGivingTransaction({
  //           currency: currencies[selectedCurrencyIndex].substring(0, 3),
  //           amount: amountF,
  //           paymentMethod: paymentMethod,
  //         })
  //       );
  //     }, 2000);
  // }, [screenLoading]);

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
              <Text style={styles.r1t2}>Support</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <Text style={styles.r7t}>
              <Text style={styles.r7ti}>Dear users!</Text> We hope you like this
              app. But if you have any problem/questions or just want to
              encourage us we would love to hear from you any review about the
              app!
            </Text>
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

export default Support;

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
  v1rbt2: {
    marginRight: 10,
    // borderWidth: 1,
  },
  r7t: {
    marginVertical: 25,
    alignSelf: "flex-start",
    fontSize: SIZES.sizeSixC,
    fontWeight: "400",
    color: COLORS.Light.gray,
    lineHeight: 26,
  },
  r7ti: {
    marginVertical: 25,
    alignSelf: "flex-start",
    fontSize: SIZES.sizeSixC,
    fontWeight: "600",
    // color: COLORS.Light.gray,
    lineHeight: 26,
  },
  r3: {
    width: "100%",
    marginTop: 5,
    marginBottom: 15,
  },
  r3t1: {
    marginBottom: 10,
    fontWeight: "300",
    fontSize: SIZES.sizeSixB,
  },
  inputContent: {
    fontSize: SIZES.sizeSeven,
    fontWeight: "500",
    color: COLORS.Light.colorTwentySeven,
    width: "100%",
    backgroundColor: COLORS.Light.background,
    marginBottom: 8,
    padding: 2,
  },
  outlineStyle: {
    borderRadius: 12,
  },
  r4: {
    marginTop: "25%",
    writingDirection: "rtl",
    width: "100%",
    alignSelf: "flex-end",
  },
  r4btn: {},
  r5: {
    marginVertical: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
    // justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  r5c1: {
    marginHorizontal: 10,
    backgroundColor: COLORS.Light.colorOneLight,
    padding: 15,
    borderRadius: 40,
  },
  r5c2: {
    justifyContent: "space-between",
  },
  r5c2t1: {
    fontWeight: "500",
    fontSize: SIZES.sizeSixB,
    marginBottom: 5,
  },
  r5c2t2: {
    fontWeight: "400",
    fontSize: SIZES.sizeSix,
    color: COLORS.Light.deeperGreyColor,
    // marginTop: 5,
  },
  r6: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.Light.colorThirteenB,
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
  },
  r6t: {
    color: COLORS.Light.colorThirteen,
    fontWeight: "600",
    fontSize: SIZES.sizeSixC,
  },
  xstyle: {
    width: 220,
    // height: 150,
    top: 110,
    right: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bstyle: {
    // paddingVertical: "10%",
    paddingHorizontal: "8%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    borderColor: COLORS.Light.hashBackGround,
    borderWidth: 2,
  },
  optionBody: {
    padding: "5%",
    marginVertical: "5%",
  },
  optionText: {
    fontSize: SIZES.sizeSeven,
    // fontWeight: "600",
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
});
