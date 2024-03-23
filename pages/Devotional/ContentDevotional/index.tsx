import {
    Image,
    ScrollView, Share,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import React, {useEffect, useState} from "react";
import {Text, View} from "../../../components/Themed";
import {COLORS, IMAGES, SIZES} from "../../../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {Entypo, Feather, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {CompositeScreenProps, useFocusEffect} from "@react-navigation/native";
import {
    DevotionalItemProps,
    SelectedDevotionalDataType,
} from "../../../shared/types/slices";
import {
    DevotionalProps,
    DevotionalRoutes,
} from "../../../shared/const/routerDevotional";
import {NotePadSVG, SpeakerSVG} from "../../../shared/components/SVGS";
import ControlModal from "./ControlModal";
import SpeakerModal from "./SpeakerModal";
import TextFormatModal from "./TextFormatModal";
import NotesModal from "./NotesModal";
import ControlModal2 from "./ControlModal2";
import SubscriptionModal from "./SubscriptionModal";
import {RootRoutes, RootScreenProps} from "../../../shared/const/routerRoot";
import {NotesRoutes} from "../../../shared/const/routerNotes";
import {MoreRoutes} from "../../../shared/const/routerMore";

// type NavigationProps = DevotionalProps<DevotionalRoutes.ContentDevotional>;

type NavigationProps = CompositeScreenProps<
    DevotionalProps<DevotionalRoutes.ContentDevotional>,
    RootScreenProps<RootRoutes.Devotional>
>;

const ContentDevotional: React.FC<NavigationProps> = ({
                                                          navigation,
                                                          route,
                                                      }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [hideModal, setHideModal] = useState<boolean>(false);
    const [hideSubscription, setHideSubscription] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"speaker" | "text" | "notes">();
    const [selectedDevotional, setSelectedDevotionals] =
        useState<SelectedDevotionalDataType | null>();
    const [play, setPlay] = useState<boolean>(false);

    const togglePlay = () => {
        setPlay(!play);
    };

    const devotionalState = useSelector((state: RootState) => state.devotional);
    const {selectedDevotionalData} = devotionalState;

    const userState = useSelector((state: RootState) => state.user);
    const {userData} = userState;

    useFocusEffect(() => {
        setSelectedDevotionals(selectedDevotionalData);
    });

    useFocusEffect(() => {
        setTimeout(() => {
            setHideModal(false);
            setHideSubscription(userData?.hasSubscribed || false);
            // setHideSubscription(false);
        }, 3000);
    });

    const shareData = async (val: string) => {
        try {
            await Share.share({
                title: "Devotional",
                message: val,

            }, {
                dialogTitle: "BAM: Devotional",
                tintColor: COLORS.Light.colorOne
            });
        } catch (error) {
            debug.error("error while sharing", error);
        }
    };



    return (
        <View style={styles.main}>
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
                            <Text style={styles.r1t2}>Devotional</Text>
                        </View>
                        <View style={styles.h}>
                            <TouchableOpacity
                                style={styles.h1r1}
                                onPress={() => {
                                    setModalType("speaker");
                                    setHideModal(true);
                                }}
                            >
                                <SpeakerSVG/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.h1r2}
                                onPress={() => {
                                    setModalType("text");
                                    setHideModal(true);
                                }}
                            >
                                <Text style={styles.h1r2t}>Aa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.h1r3}
                                onPress={() => {
                                    setModalType("notes");
                                    setHideModal(true);
                                }}
                            >
                                <NotePadSVG/>
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
                        <Text style={styles.fv1}>{selectedDevotional?.date}</Text>
                        <Text style={styles.fv3}>{selectedDevotional?.title}</Text>
                        <Text style={styles.fv1}>READ:</Text>
                        <Text style={styles.fv3}>{selectedDevotional?.bibleVerse}</Text>
                        <Text style={styles.fv1}>KEY VERSE:</Text>
                        <Text style={styles.fv2}>{selectedDevotional?.keyText}</Text>
                        <Text style={styles.fv5}>{selectedDevotional?.keyVerse}</Text>
                        <Text style={styles.fv1}>MESSAGE:</Text>
                        <Text style={styles.fv4}>{selectedDevotional?.message}</Text>

                        {selectedDevotional?.subMessages?.map((subMessage, idx) => (
                            <View key={idx} style={styles.fvv4}>
                                <Text style={styles.fv6}>{subMessage?.title}</Text>
                                <Text style={styles.fv4}>{subMessage.message}</Text>
                            </View>
                        ))}

                        <Text style={styles.fv1}>PRAYER:</Text>
                        <Text style={styles.fv2}>{selectedDevotional?.prayer}</Text>
                    </ScrollView>
                    <View style={styles.floatingContainer}>
                        <TouchableOpacity style={styles.floatingContent1}>
                            <Text style={styles.fc1t}>Daily Living Devotional 2023</Text>
                            <Text style={styles.fc3t}>Day 265</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.floatingContent2}
                            onPress={() => {
                                togglePlay();
                            }}
                        >
                            <Text style={styles.fc2t}>
                                <FontAwesome5
                                    name={!play ? "play" : "pause"}
                                    size={28}
                                    color={COLORS.Light.background}
                                />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.floatingContent3} onPress={() => {
                            shareData(selectedDevotional?.message || "")
                        }}>
                            <Text style={styles.fc3t}>
                                <Entypo name="share" size={30} color={COLORS.Light.colorOne}/>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ControlModal2
                visible={hideModal}
                closeModal={() => {
                    setHideModal(false);
                }}
                children={
                    <>
                        {modalType === "speaker" && <SpeakerModal/>}
                        {modalType === "text" && <TextFormatModal/>}
                        {modalType === "notes" && (
                            <NotesModal
                                noteTitle={
                                    selectedDevotional?.title ||
                                    `New Note ${new Date().toISOString()}`
                                }
                                setModalVisible={() => {
                                    setHideModal(false);
                                }}
                            />
                        )}
                    </>
                }
            />
            <SubscriptionModal
                visible={hideSubscription}
                closeModal={() => {
                    setHideSubscription(false);
                    navigation?.goBack();
                }}
                handleUpgrade={() => {
                    setHideSubscription(false);
                    navigation?.navigate(RootRoutes.More, {
                        screen: MoreRoutes.SubscriptionMain,
                    });
                }}
            />
        </View>
    );
};

export default ContentDevotional;

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
    },
    headerC1: {
        // borderWidth: 1,
        // justifyContent: "center",
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
        paddingBottom: "40%",
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
        height: 120,
        width: 120,
        marginVertical: 10,
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
    fv1: {
        marginVertical: 20,
        color: COLORS.Light.colorThirteen,
        fontSize: SIZES.sizeEight,
        fontWeight: "600",
        alignSelf: "flex-start",
        fontFamily: "Bitter",
    },
    fv2: {
        // marginVertical: 5,
        lineHeight: 28,
        marginStart: 15,
        fontSize: SIZES.sizeSixB,
        fontFamily: "Bitter",
    },
    fv3: {
        marginTop: 2,
        marginBottom: 15,
        alignSelf: "flex-start",
        fontWeight: "800",
        fontSize: SIZES.sizeNine,
        fontFamily: "Bitter",
    },
    fv4: {
        // marginVertical: 20,
        lineHeight: 28,
        fontFamily: "Bitter",
        fontSize: SIZES.sizeSixB,
        marginBottom: 25,
        alignSelf: "flex-start",
    },
    fvv4: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    fv6: {
        alignSelf: "flex-start",
        lineHeight: 28,
        fontFamily: "Bitter",
        fontSize: SIZES.sizeSixC,
    },
    fv5: {
        marginVertical: 20,
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeSevenB,
        fontWeight: "600",
        alignSelf: "flex-start",
        fontFamily: "Bitter",
        marginStart: 15,
    },
    r1t2: {
        marginLeft: "10%",
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeEightB,
        fontWeight: "600",
        textAlign: "center",
    },
    h: {
        // borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    h1r1: {
        // borderWidth: 1,
        marginLeft: "2%",
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.Light.colorBlueBackGround,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    h1r1t: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        // borderWidth: 1,
    },
    h1r2: {
        marginLeft: "2%",
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.Light.colorBlueBackGround,
    },
    h1r2t: {
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        fontSize: SIZES.sizeEight,
        fontWeight: "400",
    },
    h1r3: {
        // borderWidth: 1,
        marginLeft: "2%",
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.Light.colorBlueBackGround,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    h1r3t: {
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
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
    floatingContainer: {
        // borderWidth: 1,
        height: 50,
        width: "100%",
        position: "absolute",
        top: "90%",
        // left: "5%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    floatingContent1: {
        height: 65,
        width: "100%",
        // borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.Light.colorTwentyOne,
        borderTopColor: COLORS.Light.hashHomeBackGround,
        borderTopWidth: 1,
        position: "absolute",
    },
    floatingContent2: {
        height: 68,
        width: 68,
        position: "absolute",
        top: "-148%",
        backgroundColor: COLORS.Light.colorOne,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.Light.colorOneLightA,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    floatingContent3: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        height: 70,
        width: 70,
        backgroundColor: COLORS.Light.colorNineteen,
        right: 8,
        top: -50,
        borderRadius: 40,
        shadowColor: COLORS.Light.deeperGreyColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    fc1t: {
        fontSize: SIZES.sizeSixC,
        fontWeight: "500",
    },
    fc2t: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginLeft: "8%",
    },
    fc3t: {
        fontSize: SIZES.sizeSixC,
        fontWeight: "500",
        color: COLORS.Light.greyText,
    },
});
