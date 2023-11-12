import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { MoreProps, MoreRoutes } from "../../../shared/const/routerMore";
import { MdiNairaSVG } from "../../../shared/components/SVGS";
import { MainButton } from "../../../components";
import { screenNotificationActions } from "../../../store/slices/notification";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "../../../shared/const/routerRoot";
import { MainRoutes } from "../../../shared/const/routerMain";
import { moreActions } from "../../../store/slices/more";
import { SubscriptionType } from "../../../shared/types/slices";
import { userActions } from "../../../store/slices/user";

type ISubscriptionType = {
  period: SubscriptionType;
  price: string;
};

// type NavigationProps = MoreProps<MoreRoutes.SubscriptionMain>;

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.SubscriptionMain>,
  RootScreenProps<RootRoutes.More>
>;

const SubscriptionMain: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] =
    useState<number>(0);
  const merits = [
    "Support quality writing",
    "Read devotionals offline in the app",
    "Listen to any devotional",
  ];

  const subcriptions: ISubscriptionType[] = [
    { period: "Annually", price: "18,000.00/year" },
    { period: "Quarterly", price: "6,000.00/year" },
    { period: "Monthly", price: "1,500.00/year" },
  ];

  const screenNotificationState = useSelector(
    (state: RootState) => state.screenNotification
  );
  const { screenLoading } = screenNotificationState;

  useEffect(() => {
    if (screenLoading && route.name === "SubscriptionMain")
      setTimeout(async () => {
        await dispatch(screenNotificationActions.updateScreenLoading(false));
        navigation?.navigate(RootRoutes.Main, {
          screen: MainRoutes.Success,
          params: {
            mainText: "Successful",
            subText: "Your annual subscription is now active",
            btnText: "Continue",
            toScreen: RootRoutes.More,
            toSubScreen: MoreRoutes.SubscriptionSummary,
            toSubScreenParams: {},
          },
        });
        dispatch(
          moreActions.updateActiveSubsriptionData({
            subscriptionType: subcriptions[selectedSubscriptionIndex].period,
            status: "Pending",
            amountPaid: subcriptions[selectedSubscriptionIndex].price,
            paymentMethod: "Card",
          })
        );
        dispatch(userActions.updateUserSubscriptionStatus(true));
      }, 2000);
  }, [screenLoading]);

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
              <Text style={styles.r1t2}>Subscription</Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <Image source={IMAGES.logoDailyAnswer} style={styles.rmt} />
            <Text style={styles.r1t}>
              Subscribe to get full access to all devotional contents on Daily
              Answer.
            </Text>
            {merits?.map((merit, idx) => (
              <View style={styles.r2} key={idx}>
                <Text style={styles.r2c}>
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle"
                    size={24}
                    color={COLORS.Light.colorOne}
                  />
                </Text>

                <Text style={styles.r2t}>{merit}</Text>
              </View>
            ))}

            {subcriptions?.map((subscription, idx) => (
              <TouchableOpacity
                style={[
                  styles.r3,
                  {
                    borderColor:
                      idx === selectedSubscriptionIndex
                        ? COLORS.Light.colorOne
                        : COLORS.Light.tickGray,
                    borderWidth: idx === selectedSubscriptionIndex ? 2 : 1,
                  },
                ]}
                key={idx}
                onPress={() => {
                  setSelectedSubscriptionIndex(idx);
                }}
              >
                <View style={styles.r3c1}>
                  <Text style={styles.r3c1t1}>{subscription.period}</Text>

                  <Text style={styles.r3c1t2}>
                    <MdiNairaSVG />
                    {subscription.price}
                  </Text>
                </View>
                <View style={styles.r3c2}>
                  <MaterialIcons
                    name={
                      idx === selectedSubscriptionIndex
                        ? "radio-button-on"
                        : "radio-button-unchecked"
                    }
                    size={24}
                    color={COLORS.Light.colorOne}
                  />
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.r4}>
              <MainButton
                title={"Subscribe"}
                onPressFunction={() => {
                  // navigation?.navigate(AuthRoutes.SignUp);
                  dispatch(
                    screenNotificationActions.updateScreenLoadingFunc({
                      screenLoading: true,
                    })
                  );
                }}
                err={false}
                btnStyle={styles.r4btn}
                // disabled={!proceed}
              />
            </View>

            <TouchableOpacity style={styles.r56}>
              <Text style={styles.r5t}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.r56}>
              <Text style={styles.r6t}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.r7t}>
              By clicking “Subscribe”, you agree to our Membership Terms of
              Service. Your payment method will, based on your selection, be
              charged on a recurring basis N1,500.00 monthly, N6,000.00 or
              N18,000.00 yearly (prices are subject change).
            </Text>
            <Text style={styles.r8t}>
              Your Daily Answer membership will be billed in your local
              currency, using exchange rates set by Paystack. Your payments will
              be processed by Paystack within 24 hours of the end of the current
              billing cycle.
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SubscriptionMain;

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
  rmt: {
    width: 65,
    height: 65,
    alignSelf: "flex-start",
  },
  r1t: {
    marginTop: "13%",
    marginBottom: "6%",
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightA,
    fontWeight: "400",
    fontFamily: "Bitter",
  },
  r2: {
    flexDirection: "row",
    width: "100%",
    marginTop: 15,
    alignItems: "center",
  },
  r2c: {
    marginRight: "4%",
  },
  r2t: {
    fontSize: SIZES.sizeSixB,
  },
  r3: {
    borderWidth: 1,
    width: "100%",
    marginTop: 25,
    flexDirection: "row",
    paddingVertical: 24,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 12,
    borderColor: COLORS.Light.tickGray,
    justifyContent: "space-between",
  },
  r3c1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  r3c1t1: {
    fontSize: SIZES.sizeSevenB,
    fontWeight: "500",
  },
  r3c1t2: {
    fontSize: SIZES.sizeSeven,
    fontWeight: "500",
    // textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  r3c2: {},
  r4: {
    marginVertical: 50,
    writingDirection: "rtl",
    width: "100%",
  },
  r4btn: {},
  r56: {
    alignSelf: "flex-start",
  },
  r5t: {
    marginBottom: 25,

    textDecorationLine: "underline",
    fontSize: SIZES.sizeSix,
    fontWeight: "300",
  },
  r6t: {
    marginBottom: 25,
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    fontSize: SIZES.sizeSix,
    fontWeight: "300",
  },
  r7t: {
    marginBottom: 25,
    alignSelf: "flex-start",
    fontSize: SIZES.sizeSix,
    fontWeight: "300",
    lineHeight: 23,
  },
  r8t: {
    marginBottom: 25,
    alignSelf: "flex-start",
    fontSize: SIZES.sizeSix,
    fontWeight: "300",
    lineHeight: 23,
  },
});
