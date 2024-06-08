import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import {useQuery} from "react-query";

import React, {ReactNode, useEffect, useState} from "react";
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
import {CancelIconSVG, MdiNairaSVG, SuccessSVG} from "@shared/components/SVGS";
import {MainButton} from "../../../components";
import {screenNotificationActions} from "@store/slices/notification";
import {CommonActions, CompositeScreenProps} from "@react-navigation/native";
import {RootRoutes, RootScreenProps} from "@shared/const/routerRoot";
import {MainRoutes} from "@shared/const/routerMain";
import {Tabs} from "@shared/const/routerBottomBar";
import {fetchLiveSubscriptionCall} from "@store/apiThunks/payment";
import {GenericResponseType} from "@services/type";
import {SubscriptionPayloadType} from "@services/payments/subscription/type";
import {ActivityIndicator} from "react-native-paper";

// type NavigationProps = MoreProps<MoreRoutes.SubscriptionMain>;

type NavigationProps = CompositeScreenProps<
    MoreProps<MoreRoutes.SubscriptionSummary>,
    RootScreenProps<RootRoutes.More>
>;

const SubscriptionSummary: React.FC<NavigationProps> = ({
                                                            navigation,
                                                            route,
                                                        }) => {
    const dispatch = useDispatch<AppDispatch>();
    const moreState = useSelector((state: RootState) => state.more);
    const {activeSubscriptionData} = moreState;

    const {
        data: liveData,
        isLoading: liveDataLoading,
        isError: liveDataError,
    } = useQuery<GenericResponseType<SubscriptionPayloadType>>("fetchlivesubscription", async () =>
        await dispatch(fetchLiveSubscriptionCall({
            fetchLiveSubscriptionRequest: {}
        })).unwrap()
    );

    // debug.log("liveData", liveData)
    // debug.log("liveDataLoading", liveDataLoading)
    // debug.log("liveDataError", liveDataError)

    const resetAction = CommonActions.reset({
        index: 1,
        routes: [
            {
                name: RootRoutes.Tabs,
                params: {
                    screen: Tabs.Devotional,
                },
            },
        ],
    });

    if (liveDataLoading) {
        return (
            <View style={styles.modalLogoImage}>
                <ActivityIndicator
                    color={COLORS.Light.colorOne}
                    size={73}
                    animating={true}
                    style={styles.loader}
                />

                <Image source={IMAGES.logoDailyAnswer} style={styles.r2t}/>
            </View>
        )
    }

    return (
        <View style={styles.main}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.container}>
                <View style={[styles.headerContainer]}>
                    <View style={styles.header}>
                        <View style={styles.headerC1}>
                            <TouchableOpacity
                                // style={styles.r2t}
                                onPress={() => {
                                    navigation.pop(1);
                                    navigation?.goBack();
                                }}
                            >
                                <Ionicons
                                    name="arrow-back-sharp"
                                    size={28}
                                    color={COLORS.Light.colorFour}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        style={styles.scroll}
                    >
                        <View style={styles.r3}>
                            <View style={[styles.r3I, liveDataError && {backgroundColor: COLORS.Light.colorFourteenB}]}>
                                {(liveDataError || "ACTIVE" !== liveData?.payload?.subscriptionStatus?.toUpperCase()) ?
                                    <CancelIconSVG width={65} height={65} color={COLORS.Light.colorFourteenB}
                                    /> :
                                    <SuccessSVG/>
                                }

                            </View>
                            <Text style={styles.r3h1}>
                                {liveData?.payload?.subscriptionType || activeSubscriptionData?.subscriptionType || "---"} Subscription
                            </Text>
                            <Text style={styles.r3h2}>

                                {`You have an active ${liveData?.payload?.subscriptionType || "annual"} subscription`}
                            </Text>
                            <View style={styles.r3a}>
                                <Text style={styles.r3at1}>Subscription type</Text>
                                <Text style={styles.r3at2}>
                                    {liveData?.payload?.subscriptionType || activeSubscriptionData?.subscriptionType || "---"}
                                </Text>
                            </View>
                            <View style={styles.r3a}>
                                <Text numberOfLines={2} style={styles.r3at1}>Date of next subscription</Text>
                                <Text numberOfLines={2} style={styles.r3at2}>
                                    {activeSubscriptionData?.dateNextSubscription || "---"}
                                </Text>
                            </View>
                            <View style={styles.r3a}>
                                <Text style={styles.r3at1}>Number of days left</Text>
                                <Text style={styles.r3at2}>
                                    {activeSubscriptionData?.numberOfDaysLeft || "---"} days left
                                </Text>
                            </View>
                            <View style={styles.r3a}>
                                <Text style={styles.r3at1}>Status</Text>
                                <Text
                                    style={[styles.r3at2, {color: COLORS.Light.colorThirteen}]}
                                >
                                    {liveData?.payload?.subscriptionStatus ||activeSubscriptionData?.status || "---"}
                                </Text>
                            </View>
                            <View style={styles.r3a}>
                                <Text style={styles.r3at1}>Amount paid</Text>
                                <Text style={styles.r3at2}>
                                    NGN {liveData?.payload?.amountPaid ||activeSubscriptionData?.amountPaid || "---"}
                                </Text>
                            </View>
                            <View style={styles.r3a}>
                                <Text style={styles.r3at1}>Payment method</Text>
                                <Text style={[styles.r3at2, {textTransform:"capitalize",}]}>
                                    {liveData?.payload?.paymentMethod ||activeSubscriptionData?.paymentMethod || "---"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.r4}>
                            <MainButton
                                title={"Read devotional"}
                                onPressFunction={() => {
                                    navigation?.dispatch(resetAction);
                                }}
                                err={false}
                                btnStyle={styles.r4btn}
                                // disabled={!proceed}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default SubscriptionSummary;

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
    r4: {
        marginVertical: 50,
        writingDirection: "rtl",
        width: "100%",
    },
    r4btn: {},
    r3: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: COLORS.Light.hashBackGroundL2,
        padding: 30,
        borderRadius: 15,
    },
    r3I: {
        // width: "100%",
        marginVertical: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
        // borderWidth: 1,

        padding: 10,
    },
    r3h1: {
        backgroundColor: COLORS.Light.hashBackGroundL2,
        textTransform:"capitalize",
        fontSize: SIZES.sizeNine,
        fontWeight: "600",
    },
    r3h2: {
        backgroundColor: COLORS.Light.hashBackGroundL2,
        fontSize: SIZES.sizeSixC,
        fontWeight: "400",
        color: COLORS.Light.gray,
        marginTop: 15,
        marginBottom: 35,
        width: "100%",
        textAlign: "center",
    },
    r3a: {
        backgroundColor: COLORS.Light.hashBackGroundL2,
        marginBottom: 35,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    r3at1: {
        color: COLORS.Light.deeperGreyColor,
        fontWeight: "400",
        fontSize: SIZES.sizeSixB,
        flexShrink: 1,
        width: "60%",
    },
    r3at2: {
        backgroundColor: COLORS.Light.hashBackGroundL2,
        fontWeight: "500",
        fontSize: SIZES.sizeSixC,
        flexShrink: 1,

    },
    modalLogoImage: {
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        position: "absolute",
        top: "45%",
        left: "35%",
    },
    loader: {
        height: 150,
        // borderWidth: 1,
        width: 150,
    },
    r2t: {
        width: 50,
        height: 50,
        position: "absolute",
        top: "31%",
        left: "33%",
    },
});
