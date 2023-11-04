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
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { MoreProps, MoreRoutes } from "../../../shared/const/routerMore";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "../../../shared/const/routerRoot";
import { TextInput } from "react-native-paper";
import DropDownInput from "../../../components/DropDownInput";
import {
  CardAddSVG,
  MdiBankSVG,
  MdiNairaSVG,
  RewardHeartSVG,
} from "../../../shared/components/SVGS";
import { MainButton } from "../../../components";
import { screenNotificationActions } from "../../../store/slices/notification";
import { MainRoutes } from "../../../shared/const/routerMain";
import { moreActions } from "../../../store/slices/more";
import ControlModal2 from "../../Devotional/ContentDevotional/ControlModal2";
import { OptionsPopUp } from "../../Main/Home/OptionsPopUp";
import CustomDatePicker from "../../Devotional/FilterDevotional/CustomDatePicker";
import { formatDate } from "../../../shared/helper";
import { GivingPaymentMethodType } from "../../../shared/types/slices";

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.GivingHistory>,
  RootScreenProps<RootRoutes.More>
>;

const GivingHistory: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [hideOptions, setHideOptions] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [amountF, setAmountF] = useState<string>("0.00");
  const [currency, setCurrency] = useState<string>("");
  const [paymentMethod, setPaymentMethod] =
    useState<GivingPaymentMethodType>("C");
  // const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
  const [hideCurrency, setHideCurrency] = useState<boolean>(false);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState<number>(0);
  const [toDate, setToDate] = useState<string>(formatDate(new Date()));
  const [hideModal, setHideModal] = useState<boolean>(false);

  const screenNotificationState = useSelector(
    (state: RootState) => state.screenNotification
  );
  const { screenLoading } = screenNotificationState;

  const moreState = useSelector((state: RootState) => state.more);
  const { givingTransactions } = moreState;

  // useEffect(() => {
  //   if (screenLoading && route.name === MoreRoutes.GivingHistory)
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
  // dispatch(
  //   moreActions.updateActiveSubsriptionData({
  //     subscriptionType: subcriptions[selectedSubscriptionIndex].period,
  //     status: "Pending",
  //     amountPaid: subcriptions[selectedSubscriptionIndex].price,
  //     paymentMethod: "Card",
  //   })
  // );
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
              <Text style={styles.r1t2}>Giving History</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <View style={styles.r7}>
              <Text style={styles.r7t}>Last 20 transactions only</Text>
              <View style={styles.r7b}>
                <CustomDatePicker
                  pickSelectedDate={(val) => {
                    setToDate(val);
                  }}
                />
              </View>
            </View>

            <View style={styles.r5Container}>
              {givingTransactions.length > 0 &&
                givingTransactions.map((transaction, idx) => (
                  <TouchableOpacity
                    style={styles.r5}
                    key={idx}
                    onPress={() => {
                      navigation?.navigate(MoreRoutes.GiftSummary);
                      dispatch(moreActions.setSelectedGivingTransaction(idx));
                    }}
                  >
                    <View style={styles.r5c1}>
                      <View style={styles.r5c1a}>
                        <AntDesign
                          name="arrowup"
                          size={24}
                          color={COLORS.Light.colorOne}
                        />
                      </View>
                      <View style={styles.r5c1b}>
                        <Text style={styles.r5c1bt1}>
                          <MaterialCommunityIcons
                            name={`currency-${transaction.currency.toLowerCase()}`}
                            // name={`currency-usd`}
                            size={20}
                            color={COLORS.Light.colorFour}
                          />
                          {transaction.amount}
                        </Text>
                        <Text style={styles.r5c1bt2}>{transaction.date}</Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.r5c2,
                        {
                          color: (transaction?.status || "failed")
                            .toLowerCase()
                            .includes("success")
                            ? COLORS.Light.colorThirteen
                            : (transaction.status || "failed")
                                .toLowerCase()
                                .includes("pend")
                            ? COLORS.Light.colorNineB
                            : COLORS.Light.colorFourteenB,
                        },
                      ]}
                    >
                      {transaction.status}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
            {givingTransactions.length == 0 && (
              <>
                <View style={styles.r3}>
                  <View style={styles.r3a}>
                    <RewardHeartSVG />
                  </View>
                  <Text style={styles.r3t1}>
                    When you give a gift, it will appear here once it is
                    processed.
                  </Text>
                </View>

                <View style={styles.r4}>
                  <MainButton
                    title={"Give Now"}
                    onPressFunction={() => {
                      navigation.pop(1);
                      navigation?.replace(MoreRoutes.Give);
                    }}
                    err={false}
                    btnStyle={styles.r4btn}
                    // disabled={!proceed}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default GivingHistory;

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
  r7: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  r7b: {},
  r7t: {
    marginVertical: 15,
    alignSelf: "flex-start",
    fontSize: SIZES.sizeSixB,
    fontWeight: "400",
    color: COLORS.Light.deeperGreyColor,
    lineHeight: 26,
  },
  r3: {
    marginVertical: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  r3a: {
    marginVertical: 45,
  },
  r3t1: {
    fontSize: SIZES.sizeSixB,
    fontWeight: "400",
    color: COLORS.Light.deeperGreyColor,
    textAlign: "center",
  },

  r4: {
    marginTop: 15,
    writingDirection: "rtl",
    width: "84%",
  },
  r4btn: {
    height: 65,
  },
  r5Container: {
    width: "100%",
    marginVertical: 20,
  },
  r5: {
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.Light.hashHomeBackGround,
    borderRadius: 15,
    padding: 15,
  },
  r5c1: {
    borderRadius: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  r5c1a: {
    marginRight: 10,
    backgroundColor: COLORS.Light.colorOneLight,
    padding: 15,
    borderRadius: 30,
  },
  r5c1b: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  r5c1bt1: {
    marginBottom: 10,
    fontWeight: "500",
    fontSize: SIZES.sizeEight,
  },
  r5c1bt2: {
    fontWeight: "400",
    fontSize: SIZES.sizeSix,
    color: COLORS.Light.deeperGreyColor,
  },
  r5c2: {
    // justifyContent: "space-between",
    fontSize: SIZES.sizeSixB,
    // color: COLORS.Light.deeperGreyColor,
    fontWeight: "600",
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
});
