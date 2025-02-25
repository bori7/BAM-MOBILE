import {
    Image,
    ImageBackground, ImageURISource,
    ScrollView, Share,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import React, {useEffect, useState} from "react";
import {Text, View} from "@components/Themed";
import {COLORS, IMAGES, SIZES} from "@constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@store/index";
import UserIcon from "../../../shared/assets/images/svg/solar_user_icon.svg";
import {Entypo, Feather, SimpleLineIcons} from "@expo/vector-icons";
import MidDoubleTick from "../../../shared/assets/images/svg/mdi_check_all.svg";
import SolidPray from "../../../shared/assets/images/svg/fa_solid_pray.svg";
import {OptionsPopUp} from "./OptionsPopUp";
import {MainProps, MainRoutes} from "@shared/const/routerMain";
import {screenNotificationActions} from "@store/slices/notification";
import {CompositeScreenProps, useFocusEffect} from "@react-navigation/native";
import {RootRoutes, RootScreenProps} from "@shared/const/routerRoot";
import {DevotionalRoutes} from "@shared/const/routerDevotional";
import {
    formatNoteDate,
    getDayOfTheWeek,
    getPartOfDay,
} from "@shared/helper";
import {GeneralVerseOfTheDayType} from "@shared/types/slices";
import {fetchDevotionalByIdCall, updateUserDevotionalCall} from "@store/apiThunks/devotional";
import {devotionalActions} from "@store/slices/devotional";
import {MainProfileSVG} from "@shared/components/SVGS";
import {MoreRoutes} from "@shared/const/routerMore";
import {createPrayerCall} from "@store/apiThunks/prayer";
import {prayersActions} from "@store/slices/prayer";

// type NavigationProps = MainProps<MainRoutes.HomeScreen>;

type NavigationProps = CompositeScreenProps<
    MainProps<MainRoutes.HomeScreen>,
    RootScreenProps<RootRoutes.Notes>
>;

const Home: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [hideOptions, setHideOptions] = useState<boolean>(false);
    const [currVOD, setCurrVod] = useState<GeneralVerseOfTheDayType>();


    const screenNotificationState = useSelector(
        (state: RootState) => state.screenNotification
    );
    const {screenLoading} = screenNotificationState;

    const generalState = useSelector((state: RootState) => state.general);
    const {generalVerseOfTheDayList} = generalState;

    const userState = useSelector((state: RootState) => state.user);
    const {userData, userImageBase64} = userState;

    const devotionalState = useSelector((state: RootState) => state.devotional);
    const {devotionalData: {devotionalList, userDevotional}} = devotionalState;

    const prayersState = useSelector((state: RootState) => state.prayer);
    const {prayersData} = prayersState;

    useEffect(() => {
        setCurrVod(generalVerseOfTheDayList[0] || null);
    }, []);

    const clickDevotional = async () => {
        dispatch(
            screenNotificationActions.updateScreenLoadingFunc({
                screenLoading: true,
            })
        );
        const newReadIds = [...userDevotional?.readIds || [], devotionalList[0]?.uid]
        await dispatch(updateUserDevotionalCall({
            updateUserDevotionalRequest: {
                userId: userData?.id as string,
                readIds: newReadIds
            }
        })).unwrap()
            .then((res) => {
                dispatch(devotionalActions.updateUserDevotionalState(
                    newReadIds
                ))
            })
        await dispatch(fetchDevotionalByIdCall(
            {
                fetchDevotionalByIdRequest: {
                    devotionalId: devotionalList[0]?.uid || ""
                }
            }
        )).unwrap().then(() => {
            navigation?.navigate(RootRoutes.Devotional, {
                screen: DevotionalRoutes.ContentDevotional,
            });
        }).catch((err) => {
        }).finally(() => {
            dispatch(screenNotificationActions.updateScreenLoading(false));
        })
        dispatch(screenNotificationActions.updateScreenLoading(false));
    }

    const shareData = async (val: string) => {
        try {
            await Share.share({
                title: "Memory Verse",
                message: val,

            }, {
                dialogTitle: "BAM: Verse of the day",
                tintColor: COLORS.Light.colorOne
            });
        } catch (error) {
            debug.error("error while sharing", error);
        }
    };

    const copyToClipboard = async (val: string) => {
        await Clipboard.setString(val);
        // setCopiedText('Text copied to clipboard!');
    };

    const handlePray = async () => {
        await dispatch(createPrayerCall(
            {
                createPrayerRequest: {
                    // id: "",
                    title: currVOD?.verse || "",
                    text: currVOD?.text || "",
                    dateTime: "",
                    date: "",
                    time: "",
                    answered: false,
                }
            }
        )).unwrap()
            .then((res) => {
                dispatch(
                    prayersActions.updateOrAddPrayer({
                        uid: res.payload.prayerId,
                        title: currVOD?.verse || "",
                        text: currVOD?.text || "",
                        datetime: "",
                        date: "",
                        time: "",
                        answered: false,
                    })
                );
                navigation.navigate(RootRoutes.More, {
                    screen: MoreRoutes.PrayerEdit,
                    params: {
                        prayerId: res.payload.prayerId,
                    },
                });
            }).catch((err) => {
                debug.error("err in save/add prayer button", err)
            })

    };


    const options = [{
        name: "Copy", func: (val: string) => {
            copyToClipboard(val).then(r => debug.log("r", r))
        }
    }, {
        name: "Pray", func: async () => {

            const existingPrayer = prayersData?.prayersList?.filter((p, idx_) => p.title === currVOD?.verse) || [];

            if (existingPrayer.length === 0) {
                await handlePray();
            } else {
                navigation.navigate(RootRoutes.More, {
                    screen: MoreRoutes.PrayerEdit,
                    params: {
                        prayerId: existingPrayer[0].uid,
                    },
                });
            }
        }
    }];


    return (
        <View style={styles.main}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerC1}>
                            <Text
                                style={styles.headerC1t1}>Good {getPartOfDay()} {userData?.first_name || userData?.username} 👋</Text>
                            <Text style={styles.headerC1t2}>
                                {getDayOfTheWeek(new Date().getUTCDay())}{" "}
                                {formatNoteDate(new Date())}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.headerC2}
                            onPress={() => {
                                navigation?.navigate(RootRoutes.More, {
                                    screen: MoreRoutes.Profile,
                                    params: undefined,
                                });
                            }}
                        >
                            {(userData?.image || userImageBase64) ? (
                                <Image
                                    source={{uri: userData?.image || userImageBase64}}
                                    style={styles.facecapture}
                                />
                            ) : (
                                <UserIcon width={35} height={35}/>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        style={styles.scroll}
                    >
                        <View style={styles.v1}>
                            <Text style={styles.v1t1}>Memory Verse</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation?.navigate(MainRoutes.VerseOfTheDay, {
                                        vodId: 0,
                                    });
                                }}
                            >
                                <Text style={styles.v1t2}>{currVOD?.text}</Text>
                            </TouchableOpacity>
                            <View style={styles.v1r}>
                                <Text style={styles.v1rt1}>{currVOD?.verse}</Text>
                                <View style={styles.v1rb}>
                                    <TouchableOpacity style={styles.v1rbt1} onPress={() => {
                                        shareData(
                                            currVOD?.text || ""
                                        )
                                    }}>
                                        <Entypo name="share" size={24} color={COLORS.Light.gray}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.v1rbt2}
                                        onPress={() => {
                                            setHideOptions(!hideOptions);
                                        }}
                                    >
                                        {/* <SimpleLineIcons
                      name="options-vertical"
                      size={24}
                      color={COLORS.Light.gray}
                    /> */}
                                        {!hideOptions ? (
                                            <Entypo
                                                name="dots-three-vertical"
                                                size={24}
                                                color={COLORS.Light.gray}
                                            />
                                        ) : (
                                            <Feather
                                                name="x"
                                                size={25}
                                                color={COLORS.Light.colorFour}
                                            />
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
                                                        option.func(currVOD?.text || "");
                                                        setHideOptions(!hideOptions);
                                                    }}
                                                >
                                                    <Text style={styles.optionText}>{option.name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </>
                                    }
                                />
                            )}
                        </View>
                        <Text style={styles.ft1}>Today’s Devotional</Text>
                        <View style={styles.v2}>
                            <TouchableOpacity
                                style={styles.v2r1}
                                onPress={() => {
                                    clickDevotional()
                                }}
                            >
                                <Image
                                    source={devotionalList[0]?.image?.uri ? {uri: devotionalList[0]?.image?.uri} : IMAGES.devotionalSample1}
                                    // source={IMAGES.devotionalSample1}
                                    style={styles.v2r1Image}
                                    borderTopLeftRadius={25}
                                    borderTopRightRadius={25}

                                />
                            </TouchableOpacity>
                            <View style={styles.v2r2}>
                                <View style={styles.v2r2a}>
                                    <View style={styles.v2r2aC1}>
                                        <Text
                                            style={styles.v2r2t1}>{devotionalList[0]?.date || `September 22, 2023`}</Text>
                                        <Text
                                            style={styles.v2r2t2}>{devotionalList[0]?.title || `SHARING YOUR FAITH`}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.v2r2aC2}>
                                        <MidDoubleTick
                                            fill={userDevotional?.readIds.includes(devotionalList[0]?.uid)
                                                ? COLORS.Light.colorThirteen
                                                : COLORS.Light.hashHomeBackGroundL3}
                                            // fill={COLORS.Light.colorThirteen}
                                            // stroke={COLORS.Light.colorThirteen}

                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.v2r2t}>
                                    {devotionalList[0]?.text || `The Apostles went everywhere to share their faith in Christ.
                                        They did not go to hide themselves for fear of suffering or
                                        persecution. They utilized every opport...`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.v3}>
                            <View style={styles.v3a}>
                                <Text style={styles.v3at1}>Prayer</Text>
                                <TouchableOpacity
                                    style={styles.v3at2}
                                    onPress={() => {
                                        navigation?.navigate(RootRoutes.More, {
                                            screen: MoreRoutes.Prayer,
                                            params: undefined,
                                        });
                                    }}
                                >
                                    <SolidPray width={30} height={30}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.v3b}>
                                Pray without ceasing. God wants to hear from you
                            </Text>
                            <TouchableOpacity
                                style={styles.v3c}
                                onPress={() => {
                                    navigation?.navigate(RootRoutes.More, {
                                        screen: MoreRoutes.Prayer,
                                        params: undefined,
                                    });
                                }}
                            >
                                <Text style={styles.v3ct}>Pray Now</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // borderWidth: 1,
        backgroundColor: COLORS.Light.hashHomeBackGround,
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        // marginHorizontal: "5%",
        backgroundColor: COLORS.Light.hashHomeBackGround,
    },
    headerContainer: {
        justifyContent: "flex-end",
        width: "100%",
        paddingBottom: 10,
        paddingHorizontal: "8%",
        backgroundColor: COLORS.Light.background,
        height: "16%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerC1: {
        justifyContent: "space-around",
    },
    headerC1t1: {
        fontSize: SIZES.sizeSeven,
        fontWeight: "500",
        marginBottom: 6,
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
        backgroundColor: COLORS.Light.hashHomeBackGround,
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
    v1: {
        backgroundColor: COLORS.Light.background,
        width: "100%",
        padding: 15,
        borderRadius: 20,
        shadowColor: COLORS.Light.colorTwentyFour,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
        zIndex: 5,
    },
    v1t1: {
        fontSize: SIZES.sizeSixB,
        fontWeight: "600",
        marginBottom: 20,
    },
    v1t2: {
        fontSize: SIZES.sizeSevenB,
        fontWeight: "400",
        marginBottom: 20,
        fontFamily: "Bitter",
        lineHeight: 24,
    },
    v1r: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    v1rt1: {
        color: COLORS.Light.deeperGreyColor,
        fontSize: SIZES.sizeSixB,
    },
    v1rb: {
        flexDirection: "row",
        justifyContent: "space-between",

        width: "20%",
    },
    v1rbt1: {},
    v1rbt2: {},
    v2: {
        width: "100%",
        backgroundColor: COLORS.Light.background,
        borderRadius: 25,
        shadowColor: COLORS.Light.colorTwentyFour,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        // zIndex: -1,
    },
    v2r1: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    v2r1Image: {
        height: 200,
        resizeMode: "cover",
        // borderWidth: 1,
        width: "100%",
    },
    v2r2: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 25,
    },
    v2r2a: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },
    v2r2aC1: {
        justifyContent: "space-between",
        // alignItems: "center",
    },
    v2r2aC2: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 35,
        // borderWidth: 1
    },

    v2r2t1: {
        color: COLORS.Light.deepGreyColor,
        fontSize: SIZES.sizeSixB,
        fontWeight: "400",
        marginBottom: 5,
    },
    v2r2t2: {
        fontSize: SIZES.sizeSixC,
        fontWeight: "500",
        // marginTop: 5,
    },
    v2r2t: {
        // color: COLORS.Light.deepGreyColor,
        fontSize: SIZES.sizeSix,
        fontWeight: "400",
        marginBottom: 10,
        lineHeight: 24,
    },
    v3: {
        width: "100%",
        backgroundColor: COLORS.Light.background,
        borderRadius: 25,
        shadowColor: COLORS.Light.colorTwentyFour,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        marginVertical: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    v3a: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    v3at1: {
        fontSize: SIZES.sizeSeven,
        fontWeight: "600",
        // marginBottom: 20,
    },
    v3at2: {
        alignItems: "center",
        justifyContent: "center",
    },
    v3b: {
        fontSize: SIZES.sizeSixC,
        fontWeight: "400",
        marginVertical: 20,
    },
    v3c: {
        backgroundColor: COLORS.Light.colorOneLight,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "35%",
        borderRadius: 20,
    },

    v3ct: {
        color: COLORS.Light.colorOne,
        fontWeight: "600",
        fontSize: SIZES.sizeSixC,
    },

    ft1: {
        alignSelf: "flex-start",
        marginVertical: 20,
        color: COLORS.Light.colorThirteen,
        fontSize: SIZES.sizeSeven,
        fontWeight: "600",
    },
    xstyle: {
        width: 180,
        // height: 150,
        top: 170,
        right: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: "transparent",
    },
    bstyle: {
        padding: "5%",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        borderColor: COLORS.Light.hashBackGround,
        borderWidth: 2,
    },
    optionBody: {
        padding: "8%",
        marginVertical: "3%",
    },
    optionText: {
        fontSize: SIZES.sizeSeven,
        // fontWeight: "600",
    },
    facecapture: {
        height: 35,
        width: 35,
        borderRadius: 60,
    },
});
