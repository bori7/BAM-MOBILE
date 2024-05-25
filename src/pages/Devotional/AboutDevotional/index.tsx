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
import {Feather, Ionicons} from "@expo/vector-icons";
import {CompositeScreenProps, useFocusEffect} from "@react-navigation/native";
import {DevotionalItemProps} from "@shared/types/slices";
import {
    DevotionalProps,
    DevotionalRoutes,
} from "@shared/const/routerDevotional";
import {MainButton} from "../../../components";
import {RootRoutes, RootScreenProps} from "@shared/const/routerRoot";
import {MoreRoutes} from "@shared/const/routerMore";

// type NavigationProps = DevotionalProps<DevotionalRoutes.AboutDevotional>;

type NavigationProps = CompositeScreenProps<
    DevotionalProps<DevotionalRoutes.AboutDevotional>,
    RootScreenProps<RootRoutes.Devotional>
>;

const AboutDevotional: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [hideOptions, setHideOptions] = useState<boolean>(false);
    const [devotionals, setDevotionals] = useState<DevotionalItemProps[]>([]);
    const [displayFilter, setDisplayFilter] = useState<boolean>(false);

    const toggleFilterModal = () => {
        setDisplayFilter(!displayFilter);
    };

    const devotionalState = useSelector((state: RootState) => state.devotional);
    const {devotionalData} = devotionalState;

    const options = [
        {name: "Devotional Info"},
        {name: "Calendar"},
        {name: "Settings"},
    ];

    const onClickOption = (type: string) => {
        switch (type) {
            case "Devotional Info":
                navigation.navigate(DevotionalRoutes.AboutDevotional);
            case "Pray":
                break;
            case "Save":
            case "Edit":
                break;
            case "Delete":
                navigation?.goBack();
                break;
            default:
                break;
        }
    };

    useFocusEffect(() => {
        setDevotionals(devotionalData?.devotionalList || []);
    });

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
                        </View>
                    </View>
                </View>

                <View style={styles.bodyContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        style={styles.scroll}
                    >
                        {/* <View style={styles.contentHeaderC}>
              <Text style={styles.ft1}>Filter</Text>
              <TouchableOpacity
                style={styles.contentHeaderC2}
                onPress={() => {
                  toggleFilterModal();
                }}
              >
                <Ionicons name="filter" size={28} color={COLORS.Light.gray} />
              </TouchableOpacity>
            </View> */}
                        <Image source={IMAGES.logoDailyAnswer} style={styles.r2t}/>
                        {/*<Text style={styles.fv1}>THE DAILY ANSWER DEVOTIONAL</Text>*/}
                        <Text style={styles.fv1}>ABOUT THE PUBLISHER</Text>
                        {/*<Text style={styles.fv2}>*/}
                        {/*  Lorem ipsum dolor sit amet consectetur. Et ridiculus morbi*/}
                        {/*  consequat pulvinar ut dui arcu. At arcu volutpat orci urna enim*/}
                        {/*  sed quis. Cras egestas adipiscing nibh vivamus lacus pellentesque.*/}
                        {/*  Vitae ac arcu erat proin nisl egestas magnis hac. Eget placerat*/}
                        {/*  nec enim porta. Vestibulum tortor nunc etiam tempor. Tortor*/}
                        {/*  viverra sed in molestie habitasse. Nisi malesuada non sociis amet*/}
                        {/*  sit. Mollis nunc sagittis suscipit a vestibulum. Sed eget quis*/}
                        {/*  felis pharetra tristique.*/}
                        {/*</Text>*/}
                        {/*<Text style={styles.fv3}>ABOUT THE PUBLISHER</Text>*/}
                        <Text style={styles.fv3}>Our Mission</Text>
                        <Text style={styles.fv4}>
                            At Urgent Message Production Ministry, our mission is to inspire, uplift, and enrich your
                            spiritual journey by providing daily devotional content that connects you with God’s Word.
                            We are committed to offering insightful, thought-provoking reflections that help you to grow
                            in faith and apply Biblical truths to everyday life.
                        </Text>
                        <Text style={styles.fv3}>Our History</Text>
                        <Text style={styles.fv4}>
                            Founded in 2010 by Pastor Mabel Talabi, The Daily Answer devotional was written by a small
                            community of faith-driven individuals. Over the years, The Daily Answer devotional has
                            become a trusted resource for thousands of believers worldwide, dedicated to spreading the
                            love and teachings of Jesus Christ.
                        </Text>
                        <Text style={styles.fv3}>Our Team</Text>
                        <Text style={styles.fv4}>
                            Our content is created by a diverse team of theologians, pastors, and writers who are deeply
                            rooted in scriptural knowledge and passionate about evangelism. Each devotional is crafted
                            with care, prayer, and deep contemplation to ensure that it speaks to your heart and meets
                            you where you are in your faith journey.
                        </Text>
                        <Text style={styles.fv3}>Our Vision</Text>
                        <Text style={styles.fv4}>
                            We envision a world where every believer has the tools to deepen their relationship with
                            Christ every day. Our app serves as a personal companion in your daily walk with God,
                            providing accessible, engaging, and spiritually enriching content that encourages and
                            challenges you to live a life of purpose and faith.
                        </Text>
                        <Text style={styles.fv3}>Our Commitment</Text>
                        <Text style={styles.fv4}>
                            We are committed to maintaining the highest integrity in our work and to ensuring that our
                            app is a safe, respectful, and inclusive space for all believers. We continuously strive to
                            improve and update our app based on user feedback and theological insights to better serve
                            our global community.
                        </Text>
                        <View style={styles.r4}>
                            <MainButton
                                // title={"Give Now"}
                                title={
                                    <View style={styles.r4BtnTextContainer}>
                                        <Text style={styles.r4BtnText}>{"Donate Now"}</Text>
                                        <Feather
                                            name="arrow-right"
                                            size={24}
                                            color={COLORS.Light.background}
                                        />
                                    </View>
                                }
                                onPressFunction={() => {
                                    navigation?.navigate(RootRoutes.More, {
                                        screen: MoreRoutes.Give,
                                        params: undefined,
                                    });
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

export default AboutDevotional;

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
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeEightB,
        fontWeight: "600",
    },
    fv2: {
        marginVertical: 30,
        lineHeight: 22,
    },
    fv3: {
        marginVertical: 5,
        alignSelf: "flex-start",
        fontWeight: "500",
        fontSize: SIZES.sizeSixC,
    },
    fv4: {
        marginVertical: 20,
        lineHeight: 22,
    },
    r4: {
        marginTop: 25,
        writingDirection: "rtl",
        width: "88%",
    },
    r4btn: {
        height: 60,
        // padin
    },
    r4BtnText: {
        // textAlign: "center",
        color: COLORS.Light.background,
        fontSize: SIZES.sizeSixC,
        fontWeight: "600",
        marginRight: 10,
    },
    r4BtnTextContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        flexDirection: "row",
        // borderWidth: 1,
        // width: "30%",
    },
});
