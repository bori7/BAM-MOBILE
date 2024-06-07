import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import React, {ReactNode, useEffect, useState} from "react";
import {Text, View} from "@components/Themed";
import {COLORS, IMAGES, SIZES} from "@constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@store/index";
import {
    Entypo,
    Feather,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import {MoreProps, MoreRoutes} from "@shared/const/routerMore";
import {CompositeScreenProps} from "@react-navigation/native";
import {RootRoutes, RootScreenProps} from "@shared/const/routerRoot";
import {TextInput} from "react-native-paper";
import DropDownInput from "../../../components/DropDownInput";
import {
    CardAddSVG,
    MdiBankSVG,
    MdiNairaSVG,
} from "@shared/components/SVGS";
import {MainButton} from "../../../components";
import {screenNotificationActions} from "@store/slices/notification";
import {MainRoutes} from "@shared/const/routerMain";
import {moreActions} from "@store/slices/more";
import ControlModal2 from "../../Devotional/ContentDevotional/ControlModal2";
import PaymentMethodModal, {PaymentChannelType} from "./PaymentMethodModal";
import {OptionsPopUp} from "../../Main/Home/OptionsPopUp";
import {GivingPaymentMethodType, PaymentMethodType, StatusType, SubscriptionType} from "@shared/types/slices";
import {initiatePaymentCall, paystackGetCall} from "@store/apiThunks/payment";
import {nanoid} from "@reduxjs/toolkit";
import {CustomPaymentModal} from "@shared/components/CustomPaymentModal";
import StringsFormat from "../../../shared/lib/stringsFormat";
import {userActions} from "@store/slices/user";

type NavigationProps = CompositeScreenProps<
    MoreProps<MoreRoutes.Give>,
    RootScreenProps<RootRoutes.More>
>;

const Give: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [hideOptions, setHideOptions] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>("");
    const [amountF, setAmountF] = useState<string>("0.00");
    const [currency, setCurrency] = useState<string>("");
    const [paymentMethod, setPaymentMethod] =
        useState<GivingPaymentMethodType>("C");
    // const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
    const [hideCurrency, setHideCurrency] = useState<boolean>(false);
    const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState<number>(3);

    const [cancelled, setCancelled] = useState<boolean>(false);
    const [callbackCount, setCallbackCount] = useState<number>(0);


    const currencies = [
        "NGN Nigerian Naira",
        // "CAD Canada Dollar",
        "GBP United Kingdom Pound",
        "JPY Japan Yen",
        "USD United States Dollar",
        "EUR Euro Member Countries",
    ];

    const paymentChannels: PaymentChannelType[] = [
        {
            icon: <CardAddSVG/>,
            title: "Debit Card",
            desc: "Donate using your bank card",
            type: "C",
        },
        {
            icon: <MdiBankSVG/>,
            title: "Bank Transfer",
            desc: `Donate using ${currencies[selectedCurrencyIndex]?.substring(
                0,
                3
            )} bank transfer`,
            type: "T",
        },
    ];

    const screenNotificationState = useSelector(
        (state: RootState) => state.screenNotification
    );
    const {screenLoading} = screenNotificationState;

    const userState = useSelector(
        (state: RootState) => state.user
    );
    const {userData} = userState;

    const generalState = useSelector(
        (state: RootState) => state.general
    );
    const {generalData} = generalState;


    const [hideModal, setHideModal] = useState<boolean>(false);
    const [webUrl, setWebUrl] = useState<string>("");

    const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

    const options = [{name: "Giving History"}];

    const onClickOption = (type: string) => {
        switch (type) {
            case "Giving History":
                navigation.navigate(MoreRoutes.GivingHistory);
                break;
            default:
                break;
        }
    };

    const handleCallBack = async () => {
        dispatch(screenNotificationActions.updateScreenLoading(true));
        debug.log("callbackCount", callbackCount)
        setCallbackCount(callbackCount + 1)
        await dispatch(paystackGetCall({
            paystackGetRequest: {
                trxref: generalData?.paymentReference || "",
                reference: generalData?.paymentReference || ""
            }
        })).unwrap()
            .then(async (res) => {

                if ("PENDING" === res?.payload?.status?.toUpperCase()) {
                    if (callbackCount >= 5) {
                        navigation?.navigate(RootRoutes.Main, {
                            screen: MainRoutes.Success,
                            params: {
                                mainText: "Pending",
                                subText: "Kindly hold on a moment, your transaction is processing",
                                btnText: "Continue",
                                toScreen: RootRoutes.More,
                                toSubScreen: MoreRoutes.GivingHistory,
                                toSubScreenParams: {},
                            },
                        });

                        dispatch(
                            moreActions.addGivingTransaction({
                                currency: currencies[selectedCurrencyIndex]?.substring(0, 3),
                                amount: res?.payload?.amount || amountF,
                                paymentMethod: StringsFormat.formatName(res?.payload?.channel)?.substring(0, 1) as GivingPaymentMethodType
                                    || paymentMethod ||
                                    "C",
                            })
                        );
                        return;
                    }

                    return new Promise(resolve => {
                        setTimeout(async () => {
                            resolve(await handleCallBack());
                        }, 5000);
                    });
                }

                const mainText = "SUCCESS" === res?.payload?.status?.toUpperCase()
                    ? "Successful" : "Failed"
                const subText = "SUCCESS" === res?.payload?.status?.toUpperCase()
                    ? "We appreciate your generosity. God bless you" : "Please try again..."

                navigation?.navigate(RootRoutes.Main, {
                    screen: MainRoutes.Success,
                    params: {
                        mainText: mainText,
                        subText: subText,
                        btnText: "Done",
                        toScreen: RootRoutes.More,
                        toSubScreen: MoreRoutes.GivingHistory,
                        toSubScreenParams: {},
                    },
                });

                dispatch(
                    moreActions.addGivingTransaction({
                        currency: currencies[selectedCurrencyIndex]?.substring(0, 3),
                        amount: res?.payload?.amount || amountF,
                        paymentMethod: StringsFormat.formatName(res?.payload?.channel)?.substring(0, 1) as GivingPaymentMethodType
                            || paymentMethod ||
                            "C",
                    })
                );

                if ("SUCCESS" === res?.payload?.status?.toUpperCase()) {
                    dispatch(userActions.updateUserSubscriptionStatus(true));
                }

            })
            .catch((err) => {
                const mainText = "Failed"
                const subText = "Please try again..."
                navigation?.navigate(RootRoutes.Main, {
                    screen: MainRoutes.Success,
                    params: {
                        mainText: mainText,
                        subText: subText,
                        btnText: "Done",
                        toScreen: RootRoutes.More,
                        toSubScreen: MoreRoutes.GivingHistory,
                        toSubScreenParams: {},
                    },
                });

            })
            .finally(() => {
                dispatch(screenNotificationActions.updateScreenLoading(false));
            })
        dispatch(screenNotificationActions.updateScreenLoading(false));

    }


    const onNext = async () => {
        await dispatch(initiatePaymentCall(
            {
                initiatePaymentPaystack: {
                    amount: amountF,
                    email: userData?.email_address || "",
                    // currency: currencies[selectedCurrencyIndex].substring(0, 3),
                    currency: "NGN",
                    subscriptionType: "MONTHLY",
                    reference: `GIVING_${nanoid()}`,
                    userId: userData?.id || "",

                }
            }
        )).unwrap()
            .then((res) => {
                setWebUrl(res.payload.data.authorization_url)
                setShowPaymentModal(!showPaymentModal)
            })
            .catch((err) => {

            })
    }

    const handleDismiss = async () => {
        if (cancelled) {
            setCancelled(false)
            return;
        }
        await handleCallBack();
    }


    return (
        <View style={styles.main}>
            <CustomPaymentModal
                closeModal={() => {
                    setShowPaymentModal(!showPaymentModal)
                }}
                visible={showPaymentModal}
                webUrl={webUrl}
                onDismissFunc={() => {
                    handleDismiss()
                }}
                onShowFunc={() => {

                }}
                onCancel={() => {
                    setCancelled(true)
                }}/>
            <StatusBar barStyle="dark-content"/>
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
                            <Text style={styles.r1t2}>Donation</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.v1rbt2}
                            onPress={() => {
                                setHideOptions(!hideOptions);
                            }}
                        >
                            {!hideOptions ? (
                                <Entypo
                                    name="dots-three-vertical"
                                    size={24}
                                    color={COLORS.Light.gray}
                                />
                            ) : (
                                <Feather name="x" size={25} color={COLORS.Light.colorFour}/>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                {hideOptions && (
                    <OptionsPopUp
                        bstyle={styles.bstyle}
                        xstyle={styles.xstyle}
                        children={
                            <>
                                {options.map((option, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={styles.optionBody}
                                        onPress={() => {
                                            setHideOptions(!hideOptions);
                                            onClickOption(option.name);
                                        }}
                                    >
                                        <Text style={styles.optionText}>{option.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </>
                        }
                    />
                )}
                <View style={styles.bodyContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        style={styles.scroll}
                    >
                        <Text style={styles.r7t}>
                            Thank you for choosing to partner with us for the work that we do.
                            Your generosity is highly appreciated. God bless you
                        </Text>
                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>Select currency</Text>
                            <TextInput
                                mode="outlined"
                                placeholder={"NGN"}
                                placeholderTextColor={COLORS.Light.greyText}
                                style={{...styles.inputContent}}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={false}
                                selectionColor={COLORS.Light.colorOne}
                                outlineStyle={styles.outlineStyle}
                                outlineColor={
                                    hideCurrency
                                        ? COLORS.Light.colorOne
                                        : COLORS.Light.colorTwentySix
                                }
                                activeOutlineColor={
                                    hideCurrency
                                        ? COLORS.Light.colorOne
                                        : COLORS.Light.colorTwentySix
                                }
                                value={currencies[selectedCurrencyIndex]?.substring(0, 3)}
                                onChangeText={(val) => {
                                    setCurrency(val);
                                }}
                                onPressIn={() => {
                                    setHideCurrency(!hideCurrency);
                                }}
                                right={
                                    <TextInput.Icon
                                        icon={() => (
                                            <DropDownInput
                                                hideMenu={hideCurrency}
                                                items={currencies}
                                                openMenu={() => {
                                                    setHideCurrency(true);
                                                }}
                                                closeMenu={() => {
                                                    setHideCurrency(false);
                                                }}
                                                setSelectedItemIndex={(idx: number) => {
                                                    setSelectedCurrencyIndex(idx);
                                                }}
                                                selectedItemIndex={selectedCurrencyIndex}
                                            />
                                        )}
                                        // color={COLORS.Light.colorFour}
                                        // onPress={() => setHideCurrency(!hideCurrency)}
                                        // rippleColor={COLORS.Light.colorOne}
                                    />
                                }
                            />
                        </View>

                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>Amount</Text>
                            <TextInput
                                mode="outlined"
                                placeholder={"0.00"}
                                placeholderTextColor={COLORS.Light.greyText}
                                // textContentType=""
                                style={{...styles.inputContent}}
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor={COLORS.Light.colorOne}
                                outlineColor={COLORS.Light.colorTwentySix}
                                activeOutlineColor={COLORS.Light.colorOne}
                                value={amount}
                                outlineStyle={styles.outlineStyle}
                                onChangeText={(val) => {
                                    setAmount(val);
                                    setAmountF(Number(Number(val).toFixed(2)).toLocaleString());
                                }}
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            // <MdiNairaSVG color={COLORS.Light.colorFive} />
                                            <MaterialCommunityIcons
                                                name={`currency-${currencies[selectedCurrencyIndex]
                                                    ?.substring(0, 3)
                                                    ?.toLowerCase()}`}
                                                size={24}
                                                color={
                                                    amount
                                                        ? COLORS.Light.colorFour
                                                        : COLORS.Light.greyText
                                                }
                                            />
                                        )}
                                    />
                                }
                            />
                        </View>

                        {paymentChannels
                            .filter((pC, _) => pC.type === paymentMethod)
                            .map((pC, idx) => (
                                <View style={styles.r5} key={idx}>
                                    <TouchableOpacity style={styles.r5c1}>
                                        {pC.icon}
                                    </TouchableOpacity>
                                    <View style={styles.r5c2}>
                                        <Text style={styles.r5c2t1}>{pC.title}</Text>
                                        <Text style={styles.r5c2t2}>{pC.desc}</Text>
                                    </View>
                                </View>
                            ))}

                        <TouchableOpacity
                            style={styles.r6}
                            onPress={() => {
                                setHideModal(true);
                            }}
                        >
                            <Text style={styles.r6t}>Change payment method</Text>
                        </TouchableOpacity>
                        <View style={styles.r4}>
                            <MainButton
                                title={"Next"}
                                onPressFunction={() => {
                                    // navigation?.navigate(AuthRoutes.SignUp);
                                    onNext()
                                    // dispatch(
                                    //   screenNotificationActions.updateScreenLoadingFunc({
                                    //     screenLoading: true,
                                    //   })
                                    // );
                                }}
                                err={false}
                                btnStyle={styles.r4btn}
                                disabled={!amount}
                                loading={screenLoading}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
            <ControlModal2
                visible={hideModal}
                closeModal={() => {
                    setHideModal(false);
                }}
                children={
                    <>
                        <PaymentMethodModal
                            onPressButtonFunc={() => {
                                setHideModal(false);
                                onNext()
                                // dispatch(
                                //   screenNotificationActions.updateScreenLoadingFunc({
                                //     screenLoading: true,
                                //   })
                                // );
                            }}
                            amount={`${amountF}`}
                            currency={`${currencies[selectedCurrencyIndex]?.substring(0, 3)}`}
                            paymentMethod={paymentMethod}
                            handlePaymentMethod={(val: GivingPaymentMethodType): void => {
                                setPaymentMethod(val);
                            }}
                        />
                    </>
                }
            />
        </View>
    );
};

export default Give;

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
});
