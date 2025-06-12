import {
    ActivityIndicator,
    Image, Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import React, {ReactNode, useEffect, useLayoutEffect, useState} from "react";
import {Text, View} from "@components/Themed";
import {COLORS, IMAGES, SIZES} from "@constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@store/index";
import {
    AntDesign,
    Entypo,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import {MoreProps, MoreRoutes} from "@shared/const/routerMore";
import {MainButton} from "../../../components";
import {screenNotificationActions} from "@store/slices/notification";
import {CompositeScreenProps} from "@react-navigation/native";
import {RootRoutes, RootScreenProps} from "@shared/const/routerRoot";
import {MainRoutes} from "@shared/const/routerMain";
import {moreActions} from "@store/slices/more";
import {PaymentMethodType, StatusType, SubscriptionType} from "@shared/types/slices";
import {userActions} from "@store/slices/user";
import {initiatePaymentCall, stripeCallbackGetCall} from "@store/apiThunks/payment";
import {nanoid} from "@reduxjs/toolkit";
import {CustomPaymentModal} from "@shared/components/CustomPaymentModal";
import StringsFormat from "../../../shared/lib/stringsFormat";
import ControlModal2 from "@pages/Devotional/ContentDevotional/ControlModal2";
import SupportContentModal from "@pages/More/Support/SupportContentModal";
import useSubscription from "@shared/components/SubscriptionComponent";

type ISubscriptionType = {
    period: SubscriptionType;
    price: string;
    priceTag: string;
    amount: string;
    currency: string;
};

// type NavigationProps = MoreProps<MoreRoutes.SubscriptionMain>;

type NavigationProps = CompositeScreenProps<
    MoreProps<MoreRoutes.SubscriptionMain>,
    RootScreenProps<RootRoutes.More>
>;

const SubscriptionMain: React.FC<NavigationProps> = ({navigation, route}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            presentation: "modal",
        });
    }, [navigation]);
    const dispatch = useDispatch<AppDispatch>();

    const userState = useSelector(
        (state: RootState) => state.user
    );

    const {userData} = userState;

    const generalState = useSelector(
        (state: RootState) => state.general
    );
    const {generalData} = generalState;

    const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] =
        useState<number>(0);

    const {
        products,
        loading,
        error,
        buySubscription,
        refreshSubscriptions,
        buyProductInApply,
        buyProductInApplyWithStripe
    } = useSubscription();

    debug.log("error from SubscriptionMain:: ", error)
    debug.log("products from SubscriptionMain:: ", products)
    debug.log("loading from SubscriptionMain:: ", loading)
    // debug.log("error from SubscriptionMain:: ", error)

    const [webUrl, setWebUrl] = useState<string>("");

    const [showModal, setShowModal] = useState<boolean>(false);

    const [cancelled, setCancelled] = useState<boolean>(false);

    const [callbackCount, setCallbackCount] = useState<number>(0);

    const [content, setContent] = useState<number>(1);

    const [hideModal, setHideModal] = useState<boolean>(false);

    const [publishableKey, setPublishableKey] = useState<string>("");
    const [checkoutUrl, setCheckoutUrl] = useState<string>("");

    const merits = [
        "Support quality writing",
        "Read devotionals offline in the app",
        "Listen to any devotional",
    ];

    const subcriptions: ISubscriptionType[] = [
        {period: "Annually", price: "180.00/year", priceTag: "180.00", amount: "180", currency: "USD"},
        {period: "Quarterly", price: "60.00/quarter", priceTag: "60.00", amount: "60", currency: "USD"},
        {period: "Monthly", price: "15.00/month", priceTag: "15.00", amount: "15", currency: "USD"},
    ];

    const handleSubscribe = async () => {
        await dispatch(initiatePaymentCall(
            {
                initiatePaymentPaystack: {
                    amount: subcriptions[selectedSubscriptionIndex]?.amount,
                    email: userData?.email_address || "",
                    currency: subcriptions[selectedSubscriptionIndex]?.currency || "NGN",
                    subscriptionType: subcriptions[selectedSubscriptionIndex]?.period?.toUpperCase() || "ANNUALLY",
                    reference: `SUBSCRIPTION_${nanoid()}`,
                    userId: userData?.id || "",

                }
            }
        )).unwrap()
            .then((res) => {
                setWebUrl(res.payload.data.authorization_url)
                setShowModal(!showModal)
            })
            .catch((err) => {

            })
    }

    const getPaymentSessionStatus = (valUrl: string) => {
        if (!valUrl) {
            return ""
        }

        const valUrlSplits = valUrl.split("/");
        const n = valUrlSplits.length
        return valUrlSplits[n - 1]

    }

    const handleCallBack = async () => {
        dispatch(screenNotificationActions.updateScreenLoading(true));
        debug.log("callbackCount in subscription main", callbackCount)
        setCallbackCount(callbackCount + 1)
        // await dispatch(paystackGetCall({
        // paystackGetRequest: {
        //     trxref: generalData?.paymentReference || "",
        //         reference: generalData?.paymentReference || ""
        // }
        await dispatch(stripeCallbackGetCall({
            paystackGetRequest: {
                trxref: getPaymentSessionStatus(generalData?.paymentRedirectUrl || "") || generalData?.paymentReference || "",
                reference: `SUBSCRIPTION_${generalData?.paymentSessionId || ""}`
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
                                toSubScreen: MoreRoutes.SubscriptionSummary,
                                toSubScreenParams: {},
                            },
                        });
                        dispatch(
                            moreActions.updateActiveSubsriptionData({
                                subscriptionType: StringsFormat.formatName(res?.payload?.subscriptionType) as SubscriptionType
                                    || subcriptions[selectedSubscriptionIndex].period,
                                status: StringsFormat.formatName(res?.payload?.subscriptionStatus) as StatusType || "Pending",
                                amountPaid: res?.payload?.amount || subcriptions[selectedSubscriptionIndex].price,
                                paymentMethod: StringsFormat.formatName(res?.payload?.channel) as PaymentMethodType || "Card",
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
                    ? "Your annual subscription is now active" : "Please try again..."

                navigation?.navigate(RootRoutes.Main, {
                    screen: MainRoutes.Success,
                    params: {
                        mainText: mainText,
                        subText: subText,
                        btnText: "Continue",
                        toScreen: RootRoutes.More,
                        toSubScreen: MoreRoutes.SubscriptionSummary,
                        toSubScreenParams: {},
                    },
                });
                dispatch(
                    moreActions.updateActiveSubsriptionData({
                        subscriptionType: StringsFormat.formatName(res?.payload?.subscriptionType) as SubscriptionType
                            || subcriptions[selectedSubscriptionIndex].period,
                        status: StringsFormat.formatName(res?.payload?.subscriptionStatus) as StatusType || "Pending",
                        amountPaid: res?.payload?.amount || subcriptions[selectedSubscriptionIndex].price,
                        paymentMethod: StringsFormat.formatName(res?.payload?.channel) as PaymentMethodType || "Card",
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
                        btnText: "Continue",
                        toScreen: RootRoutes.More,
                        toSubScreen: MoreRoutes.SubscriptionSummary,
                        toSubScreenParams: {},
                    },
                });
            })
            .finally(() => {
                dispatch(screenNotificationActions.updateScreenLoading(false));
            })
        dispatch(screenNotificationActions.updateScreenLoading(false));

    }

    const handleDismiss = async () => {
        if (cancelled) {
            setCancelled(false)
            return;
        }
        await handleCallBack();
    }

    // const setupIAP = async () => {
    //     try {
    //         const result = await RNIap.initConnection();
    //         debug.log('IAP connection', result);
    //         debug.log('IAP Product ID', IN_APP_PRODUCT_IDS);
    //     } catch (err) {
    //         debug.warn('IAP init error', err);
    //     }
    // };

    const handleStripePublishableKey = (key: string, key2: string) => {
        debug.log("handleStripePublishableKey", key);
        debug.log("checkOutUrl", key2);
        setPublishableKey(key);
        setCheckoutUrl(key2)
    }

    const handleStripeCheckout = () => {
        debug.log("handling Stripe Checkout");
        buyProductInApplyWithStripe({
                userId: userData?.id || '',
                shippingAddress: userData?.location || 'Alberta, Canada',
                price: subcriptions[selectedSubscriptionIndex]?.priceTag || '0',
                recipientPhoneNumber: userData?.phone_number || '8103429144',
                ccy: subcriptions[selectedSubscriptionIndex]?.currency || 'USD',
                paymentType: 'CARD',
                orderItems: [{
                    productId: userData?.id || '',
                    quantity: "1",
                    price: subcriptions[selectedSubscriptionIndex]?.priceTag || '0',
                    id: '',
                }],
                email: userData?.email_address || "",
                subscriptionType: subcriptions[selectedSubscriptionIndex]?.period?.toUpperCase() || "MONTHLY",
                reference: `SUBSCRIPTION_${nanoid()}`,
                title: "SUBSCRIPTIONS"
            },
            handleStripePublishableKey
        )
        setShowModal(!showModal);
    }


    useEffect(() => {
        setCallbackCount(0)
    }, []);

    useEffect(() => {
        setCheckoutUrl("");
    }, []);

    // const SUBSCRIPTION_SKUS = Platform.select({
    //     ios: ['com.bibleapp.bamobile.monthly'],
    //     android: ['com.boriios.bamobile']
    // }) || [];
    //
    // if (checkoutUrl) {
    //     return <View>
    //         <WebView
    //             source={{uri: checkoutUrl}}
    //             onNavigationStateChange={(navState) => {
    //                 if (navState.url.includes("success")) {
    //                     debug.log(" Payment successful!")
    //                 } else if (navState.url.includes("cancel")) {
    //                     debug.log(" Payment cancelled!")
    //                 }
    //             }}
    //             originWhitelist={['*']}
    //             javaScriptEnabled={true}
    //             domStorageEnabled={true}
    //             startInLoadingState={true}
    //         />
    //     </View>
    // }


    return (
        <View style={styles.main}>
            <CustomPaymentModal
                closeModal={() => {
                    setShowModal(!showModal)
                }}
                visible={showModal}
                webUrl={webUrl || checkoutUrl}
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
                            <Text style={styles.r1t2}>Subscription</Text>
                        </View>
                    </View>
                </View>
                {/*<StripeProvider*/}
                {/*    publishableKey={publishableKey}*/}
                {/*    merchantIdentifier="merchant.identifier"*/}
                {/*    // urlScheme="your-url-scheme"*/}
                {/*>*/}
                <View style={styles.bodyContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        style={styles.scroll}
                    >
                        <View style={styles.subscontainer}>
                            <Text style={styles.title}>Bible App Pro Subscription</Text>

                            {loading && (
                                <ActivityIndicator size="large" color="#007AFF"/>
                            )}

                            {error && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{error}</Text>
                                    <TouchableOpacity
                                        style={styles.retryButton}
                                        onPress={refreshSubscriptions}
                                    >
                                        <Text style={styles.retryButtonText}>Retry</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {products.length > 0 ? (
                                <View style={styles.productsContainer}>
                                    {products.map((product) => (
                                        <View key={product.productId} style={styles.productCard}>
                                            <Text style={styles.productTitle}>{product.title}</Text>
                                            <Text style={styles.productDescription}>{product.description}</Text>
                                            <Text style={styles.productPrice}>{product.localizedPrice}</Text>
                                            <TouchableOpacity
                                                style={styles.subscribeButton}
                                                onPress={buySubscription}
                                                disabled={loading}
                                            >
                                                <Text style={styles.subscribeButtonText}>Subscribe</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            ) : !loading && !error && (
                                <View style={styles.noProductsContainer}>
                                    <Text style={styles.noProductsText}>No subscription plans available</Text>
                                    <TouchableOpacity
                                        style={styles.retryButton}
                                        onPress={refreshSubscriptions}
                                    >
                                        <Text style={styles.retryButtonText}>Refresh</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <Image source={IMAGES.logoDailyAnswer} style={styles.rmt}/>
                        <Text style={styles.r1t}>
                            Subscribe to get full access to all devotional contents on The Daily
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
                                        {/*<MdiNairaSVG/>*/}

                                        <MaterialCommunityIcons
                                            // name={`currency-${subscription.currency.toLowerCase()}`}
                                            name={`currency-usd`}
                                            size={20}
                                            color={COLORS.Light.colorFour}
                                        />
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
                            {/*<CardField*/}
                            {/*    postalCodeEnabled={true}*/}
                            {/*    placeholders={{*/}
                            {/*        number: '4242 4242 4242 4242',*/}
                            {/*    }}*/}
                            {/*    cardStyle={{*/}
                            {/*        backgroundColor: '#FFFFFF',*/}
                            {/*        textColor: '#000000',*/}
                            {/*    }}*/}
                            {/*    style={{*/}
                            {/*        width: '100%',*/}
                            {/*        height: 50,*/}
                            {/*        marginVertical: 30,*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <MainButton
                                title={"In-App Purchase"}
                                onPressFunction={() => {
                                    buySubscription();
                                }}
                                err={false}
                                btnStyle={styles.r4btnInApp}
                                loading={loading}
                                // disabled={!proceed}
                            />
                            {/*<MainButton*/}
                            {/*    title={"Subscribe"}*/}
                            {/*    onPressFunction={() => {*/}
                            {/*        // handleSubscribe();*/}
                            {/*        // buySubscription();*/}
                            {/*        handleStripeCheckout();*/}
                            {/*    }}*/}
                            {/*    err={false}*/}
                            {/*    btnStyle={styles.r4btn}*/}
                            {/*    loading={loading}*/}
                            {/*    // disabled={!proceed}*/}
                            {/*/>*/}
                        </View>
                        {/*<View style={styles.r4}>*/}
                        {/*    */}
                        {/*</View>*/}
                        <TouchableOpacity
                            style={styles.r56}
                            onPress={() => {
                                setHideModal(true);
                                setContent(3)
                            }}

                        >
                            <Text style={styles.r5t}>Terms of Service</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.r56}
                            onPress={() => {
                                setHideModal(true);
                                setContent(4)
                            }}

                        >
                            <Text style={styles.r6t}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <Text style={styles.r7t}>
                            By clicking “Subscribe”, you agree to our Membership Terms of
                            Service. Your payment method will, based on your selection, be
                            charged on a recurring basis $15.00 monthly, $60.00 or
                            $180.00 yearly (prices are subject to change).
                        </Text>
                        <Text style={styles.r8t}>
                            Your Daily Answer membership will be billed in your local
                            currency, using exchange rates set by Paystack. Your payments will
                            be processed by Paystack within 24 hours of the end of the current
                            billing cycle.
                        </Text>
                    </ScrollView>
                </View>
                {/*</StripeProvider>*/}
            </View>
            <ControlModal2
                visible={hideModal}
                closeModal={() => {
                    setHideModal(false);
                }}
                children={
                    <>
                        <SupportContentModal
                            content={content}
                        />
                    </>
                }
            />
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
        width: 120,
        height: 120,
        alignSelf: "flex-start",
    },
    r1t: {
        marginTop: "3%",
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
        gap: 10
    },
    r4btn: {},
    r4btnInApp: {
        backgroundColor: COLORS.Light.colorFour
    },
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
    subscontainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F9FA',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    productsContainer: {
        marginTop: 16,
    },
    productCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        marginTop: 8,
        color: '#666',
        fontSize: 14,
    },
    productPrice: {
        marginTop: 12,
        fontSize: 20,
        color: '#333',
        fontWeight: '600',
    },
    subscribeButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    subscribeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    errorContainer: {
        backgroundColor: '#FFF1F0',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFCCC7',
        marginVertical: 16,
    },
    errorText: {
        color: '#CF1322',
        marginBottom: 8,
    },
    retryButton: {
        backgroundColor: 'transparent',
        padding: 8,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    retryButtonText: {
        color: '#007AFF',
    },
    noProductsContainer: {
        alignItems: 'center',
        marginTop: 32,
    },
    noProductsText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
});
