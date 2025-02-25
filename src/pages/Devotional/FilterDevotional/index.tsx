import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import React, {useEffect, useState} from "react";
import {Text, View} from "@components/Themed";
import {COLORS, IMAGES, SIZES} from "@constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@store/index";
import {AntDesign, Entypo, Feather, Ionicons} from "@expo/vector-icons";
import MidDoubleTick from "../../../shared/assets/images/svg/mdi_check_all.svg";
import {CompositeScreenProps, useFocusEffect} from "@react-navigation/native";
import {DevotionalItemProps} from "@shared/types/slices";
import {
    DevotionalProps,
    DevotionalRoutes,
} from "@shared/const/routerDevotional";
import {OptionsPopUp} from "../../Main/Home/OptionsPopUp";
import FilterModal from "./FilterModal";
import {screenNotificationActions} from "@store/slices/notification";
import {fetchDevotionalByIdCall, updateUserDevotionalCall} from "@store/apiThunks/devotional";
import {devotionalActions} from "@store/slices/devotional";
import {RootRoutes} from "@shared/const/routerRoot";
import {diffBetweenTwoDates, equalityBetweenTwoDates} from "@shared/helper";

type NavigationProps = DevotionalProps<DevotionalRoutes.FilterDevotional>;

const FilterDevotional: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [hideOptions, setHideOptions] = useState<boolean>(false);
    const [devotionals, setDevotionals] = useState<DevotionalItemProps[]>([]);
    const [displayFilter, setDisplayFilter] = useState<boolean>(false);

    const [fromDate, setFromDate] = useState<string>();
    const [toDate, setToDate] = useState<string>();

    const toggleFilterModal = () => {
        setDisplayFilter(!displayFilter);
    };

    const devotionalState = useSelector((state: RootState) => state.devotional);
    const {devotionalData: {devotionalList, userDevotional}} = devotionalState;


    const screenNotificationState = useSelector(
        (state: RootState) => state.screenNotification
    );
    const {screenLoading} = screenNotificationState;

    const userState = useSelector((state: RootState) => state.user);
    const {userData} = userState;


    const options = [
        {name: "Devotional Info"},
        {name: "Calendar"},
        {name: "Settings"},
    ];

    const onClickOption = (type: string) => {
        switch (type) {
            case "Devotional Info":
                navigation.navigate(DevotionalRoutes.AboutDevotional);
                break;
            case "Calendar":
                navigation.navigate(DevotionalRoutes.CalendarDevotional);
                break;
            case "Settings":
                navigation.navigate(DevotionalRoutes.SettingsDevotional);
                break;
            case "Edit":
                break;
            case "Delete":
                navigation?.goBack();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setDevotionals(devotionalList || []);
    }, []);

    const handleFiltering = (fro: string, to: string) => {
        if (!fro || !to) {
            return;
        }
        if (!equalityBetweenTwoDates(fro, to)) {
            return;
        }
        const filteredDevotionals = devotionalList?.filter((dev, idx_) => {
            const leftDiff = diffBetweenTwoDates(fro, dev.date);
            const rightDiff = diffBetweenTwoDates(dev.date, to);
            return (leftDiff >= 0 && rightDiff >= 0)
        }) || []

        // debug.log("filteredDevotionals", filteredDevotionals)

        setDevotionals(filteredDevotionals);
    }

    const clickDevotional = async (devotion: DevotionalItemProps) => {
        dispatch(
            screenNotificationActions.updateScreenLoadingFunc({
                screenLoading: true,
            })
        );
        const newReadIds = [...userDevotional?.readIds || [], devotion?.uid]
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
                    devotionalId: devotion?.uid || ""
                }
            }
        )).unwrap().then(() => {
            // navigation?.navigate(RootRoutes.Devotional, {
            //     screen: DevotionalRoutes.ContentDevotional,
            // });
            navigation?.navigate(DevotionalRoutes.ContentDevotional);
        }).catch((err) => {
        }).finally(() => {
            dispatch(screenNotificationActions.updateScreenLoading(false));
        })
    }


    return (
        <View style={styles.main}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.container}>
                <View style={[styles.headerContainer, styles.headerShadow]}>
                    <View style={styles.header}>
                        <View style={styles.headerC1}>
                            <TouchableOpacity
                                style={styles.r2t}
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
                        <View style={styles.contentHeaderC}>
                            <Text style={styles.ft1}>Filter</Text>
                            <TouchableOpacity
                                style={styles.contentHeaderC2}
                                onPress={() => {
                                    toggleFilterModal();
                                }}
                            >
                                <Ionicons name="filter" size={28} color={COLORS.Light.gray}/>
                            </TouchableOpacity>
                        </View>

                        {devotionals.map((devo, idx) => (
                            <View style={styles.v2} key={idx}>
                                <TouchableOpacity
                                    style={styles.v2r1}
                                    onPress={() => {
                                        clickDevotional(devo)
                                        // dispatch(
                                        //   screenNotificationActions.updateScreenLoadingFunc({
                                        //     screenLoading: true,
                                        //   })
                                        // );
                                    }
                                    }
                                >
                                    {/*<Image*/}
                                    {/*  source={devo.image}*/}
                                    {/*  style={styles.v2r1Image}*/}
                                    {/*  borderTopLeftRadius={25}*/}
                                    {/*  borderTopRightRadius={25}*/}
                                    {/*/>*/}
                                    <Image
                                        source={devo?.image?.uri ? devo.image : IMAGES.devotionalSample1}
                                        style={styles.v2r1Image}
                                        borderTopLeftRadius={25}
                                        borderTopRightRadius={25}
                                    />
                                </TouchableOpacity>
                                <View style={styles.v2r2}>
                                    <View style={styles.v2r2a}>
                                        <View style={styles.v2r2aC1}>
                                            <Text style={styles.v2r2t1}>{devo.date}</Text>
                                            <Text style={styles.v2r2t2}>{devo.title}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.v2r2aC2}>
                                            <MidDoubleTick
                                                fill={userDevotional?.readIds.includes(devo.uid)
                                                    ? COLORS.Light.colorThirteen
                                                    : COLORS.Light.hashHomeBackGroundL3}
                                                // fill={
                                                //   devo.ticked
                                                //     ? COLORS.Light.colorThirteen
                                                //     : COLORS.Light.tickGray
                                                // }
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.v2r2t}>{devo.text}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <FilterModal
                        isModalVisible={displayFilter}
                        setModalVisible={() => {
                            toggleFilterModal();
                        }}
                        onSave={(fro, to) => {
                            setFromDate(fro)
                            setToDate(to)
                            handleFiltering(fro, to)
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default FilterDevotional;

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
    v1rbt2: {
        marginRight: -12,
        // borderWidth: 1,
    },
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
        marginBottom: 40,
    },
    v2r1: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    v2r1Image: {
        height: 200,
        resizeMode: "cover",

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
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeEight,
        fontWeight: "600",
    },
    ft2: {
        alignSelf: "flex-start",
        marginVertical: 40,
        color: COLORS.Light.gray,
        fontSize: SIZES.sizeSeven,
        fontWeight: "500",
    },
    xstyle: {
        width: 220,
        height: 150,
        top: 110,
        right: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    bstyle: {
        paddingVertical: "10%",
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
    r2t: {
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1,
    },
    contentHeaderC: {
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    contentHeaderC2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentHeaderC2t1: {
        color: COLORS.Light.gray,
        fontSize: SIZES.sizeSeven,
        fontWeight: "500",
    },
    contentHeaderC2t2: {
        marginLeft: "1%",
    },
});
