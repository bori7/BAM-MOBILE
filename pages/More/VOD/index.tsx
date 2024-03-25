import React, {useEffect, useState} from "react";
import {Text, View} from "../../../components/Themed";
import {
    ScrollView, Share,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {COLORS, SIZES} from "../../../constants/Colors";
import {Entypo, Feather, Ionicons} from "@expo/vector-icons";
import {CompositeScreenProps, useFocusEffect} from "@react-navigation/native";
import {RootRoutes, RootScreenProps} from "../../../shared/const/routerRoot";
import {
    GeneralVerseOfTheDayType,
    NoteProps,
} from "../../../shared/types/slices";
import {AppDispatch, RootState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {OptionsPopUp} from "../../Main/Home/OptionsPopUp";
import {TextInput} from "react-native-paper";
import {notesActions} from "../../../store/slices/notes";
import {MoreProps, MoreRoutes} from "../../../shared/const/routerMore";
import {MainRoutes} from "../../../shared/const/routerMain";
import * as Clipboard from "expo-clipboard";

// type NavigationProps = NotesProps<NotesRoutes.NotesSearch>;

type NavigationProps = CompositeScreenProps<
    MoreProps<MoreRoutes.VOD>,
    RootScreenProps<RootRoutes.Notes>
>;

const VOD: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [hideStatusBar, setHideStatusBar] = useState<boolean>(false);
    const [fetchedVODList, setFetchedVODList] = useState<
        GeneralVerseOfTheDayType[]
    >([]);
    const [hideOptions, setHideOptions] = useState<boolean>(false);
    const [optionsIdx, setOptionsIdx] = useState<number>(-1);
    const [allowEdit, setAllowEdit] = useState<boolean>(false);

    const generalState = useSelector((state: RootState) => state.general);
    const {generalVerseOfTheDayList} = generalState;

    const options = [{name: "Copy"}, {name: "Pray"}];

    const getVODList = (): void => {
        setFetchedVODList(generalVerseOfTheDayList);
    };

    const onClickOption = (type: string, message: string = "") => {
        switch (type) {
            case "Copy":
                copyToClipboard(message)
                break;
            case "Pray":
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        getVODList();
    }, [generalVerseOfTheDayList]);


    const shareData = async (val: string) => {
        try {
            await Share.share({
                title: "VOD",
                message: val,

            }, {
                dialogTitle: "BAM: VOD",
                tintColor: COLORS.Light.colorOne
            });
        } catch (error) {
            debug.error("error while sharing more vod", error);
        }
    };


    const copyToClipboard = async (val: string) => {
        await Clipboard.setString(val);
        // setCopiedText('Text copied to clipboard!');
    };

    return (
        <View style={[styles.main]}>
            <StatusBar barStyle="dark-content" hidden={hideStatusBar}/>
            <View style={styles.container}>
                <View
                    style={[
                        styles.headerContainer,
                        {marginTop: hideStatusBar ? "7%" : 0},
                        !hideStatusBar && styles.headerShadow,
                    ]}
                >
                    <View style={styles.headerR}>
                        <TouchableOpacity
                            style={styles.headerRC1}
                            onPress={() => {
                                navigation?.goBack();
                            }}
                        >
                            <Ionicons
                                name="arrow-back-sharp"
                                size={30}
                                color={COLORS.Light.colorFour}
                            />
                        </TouchableOpacity>

                        <View style={styles.headerRC2}>
                            <View style={styles.headerRC2c1}>
                                <Text style={styles.r1t2}>Verse of the day</Text>
                            </View>

                            <View style={styles.v1rb}>
                                {!allowEdit && (
                                    <>
                                        <TouchableOpacity
                                            style={styles.v1rbt2}
                                            onPress={() => {
                                                // setHideOptions(!hideOptions);
                                                navigation?.navigate(RootRoutes.More, {
                                                    screen: MoreRoutes.PushNotifications,
                                                    params: undefined,
                                                });
                                            }}
                                        >
                                            <Ionicons
                                                name="settings-outline"
                                                size={28}
                                                color={COLORS.Light.colorFour}
                                            />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        style={styles.scroll}
                    >
                        {fetchedVODList.map((vod, idx) => (
                            <View style={styles.v1} key={idx.toString()}>
                                <Text style={styles.v1t1}>{vod.verse}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation?.navigate(RootRoutes.Main, {
                                            screen: MainRoutes.VerseOfTheDay,
                                            params: {
                                                vodId: idx,
                                            },
                                        });
                                    }}
                                >
                                    <Text style={styles.v1t2}>{vod.text}</Text>
                                </TouchableOpacity>
                                <View style={styles.v1r}>
                                    <Text style={styles.v1rt1}>{vod.date}</Text>
                                    <View style={styles.v1rb}>
                                        <TouchableOpacity style={styles.v1rbt1}
                                                          onPress={() => {
                                                              shareData(vod.text)
                                                          }}
                                        >
                                            <Entypo
                                                name="share"
                                                size={24}
                                                color={COLORS.Light.gray}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.v1rbt2}
                                            onPress={() => {
                                                setHideOptions(!hideOptions);
                                                setOptionsIdx(optionsIdx >= 0 ? -1 : idx);
                                            }}
                                        >
                                            {hideOptions && optionsIdx === idx ? (
                                                <Feather
                                                    name="x"
                                                    size={25}
                                                    color={COLORS.Light.colorFour}
                                                />
                                            ) : (
                                                <Entypo
                                                    name="dots-three-vertical"
                                                    size={24}
                                                    color={COLORS.Light.gray}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {hideOptions && optionsIdx === idx && (
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
                                                            onClickOption(option.name, vod.text);
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
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default VOD;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // borderWidth: 1,
        backgroundColor: COLORS.Light.hashBackGroundL2,
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        // marginHorizontal: "5%",
        backgroundColor: COLORS.Light.hashBackGroundL2,
        // borderWidth: 1,
    },
    headerContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        paddingBottom: 10,
        paddingHorizontal: "8%",
        backgroundColor: COLORS.Light.background,
        height: "15%",
        // shadowColor: COLORS.Light.deeperGreyColor,
        // shadowOffset: {
        //   width: 0,
        //   height: 0,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // elevation: 4,
        // zIndex: 10,
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
    headerR: {
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        // borderWidth: 1,
        // marginTop: 20,
    },
    headerRC1: {
        // marginRight: "2%",
    },
    headerRC2: {
        // width: "95%",
        paddingLeft: 18,
        paddingVertical: 9,
        flexDirection: "row",
        justifyContent: "space-evenly",
        // justifyContent: "center",
        // borderRadius: 40,
        backgroundColor: "transparent",
        alignItems: "center",
        // borderWidth: 1,
    },
    headerRC2c1: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "transparent",
        // justifyContent: "center",
        width: "100%",
    },
    headerRC2t1: {
        // marginRight: "3%",
        alignItems: "center",
        justifyContent: "center",
    },
    headerRC2t2: {
        // color: COLORS.Light.greyText,
        // fontSize: SIZES.sizeEight,
        // fontWeight: "300",
        width: "100%",
        backgroundColor: "transparent",
        // borderWidth: 1,
        height: "250%",
        alignItems: "center",
    },
    headerRC2t2Title: {
        // color: COLORS.Light.greyText,
        // fontSize: SIZES.sizeEight,
        // fontWeight: "300",
        width: "100%",
        backgroundColor: "transparent",
        // borderWidth: 1,
        // height: "250%",
        alignItems: "center",
        // marginVertical: "4%",
    },
    inputContent: {
        color: COLORS.Light.colorFour,
        width: "100%",
        backgroundColor: "transparent",
        // fontSize: SIZES.sizeEight,
        fontWeight: "400",
        // borderWidth: 1,
        // alignItems: "center",
        justifyContent: "center",
        marginVertical: 25,
        fontSize: SIZES.sizeSixC,
        lineHeight: 24,
    },
    inputContentTitle: {
        fontSize: SIZES.sizeSevenB,
        fontWeight: "600",
        marginVertical: "4%",
        color: COLORS.Light.colorFour,
        width: "100%",
        backgroundColor: "transparent",
        // fontSize: SIZES.sizeEight,
        // fontWeight: "400",
        // borderWidth: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // marginVertical: 25,
        // fontSize: SIZES.sizeSixC,
    },
    headerRC2t3: {
        // marginRight: "5%",
        alignItems: "center",
        justifyContent: "center",
    },
    bodyContainer: {
        // borderWidth: 1,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.Light.hashBackGround,
        paddingBottom: "30%",
        paddingHorizontal: "5%",
    },
    scroll: {
        // borderWidth: 1,
        width: "100%",
        backgroundColor: "transparent",
        paddingBottom: "10%",
        zIndex: 5,
    },
    scrollContent: {
        width: "100%",
        // height: "100%",
        alignItems: "flex-start",
        backgroundColor: "transparent",
        // marginBottom: 50,
        paddingVertical: 5,
        paddingBottom: "10%",

        marginTop: "8%",
    },
    r1t2: {
        marginLeft: "3%",
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeNine,
        fontWeight: "600",
        textAlign: "center",
    },
    // v1rbt1: { marginHorizontal: 10 },
    // v1rbt2: {},
    // v1rb: {
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    //   // borderWidth: 1,
    //   // width: "20%",
    //   alignItems: "center",
    //   backgroundColor: "transparent",
    // },
    bstyle: {
        // padding: "15%",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        borderWidth: 2,
        borderColor: COLORS.Light.hashBackGround,
        zIndex: 10,
    },
    optionBody: {
        padding: "10%",
        // marginVertical: "4%",
    },
    optionText: {
        fontSize: SIZES.sizeSeven,
        // fontWeight: "600",
    },
    xstyle: {
        width: 220,
        // height: 250,
        // borderWidth: 2,
        top: 10,
        right: -50,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        // borderColor: COLORS.Light.hashBackGround,
        // zIndex: 100,
        // borderWidt
    },
    dt: {
        color: COLORS.Light.deeperGreyColor,
        fontSize: SIZES.sizeSixC,
        fontWeight: "400",
        textAlign: "center",
        marginVertical: "3%",
    },
    titleContainer: {
        padding: 20,
        backgroundColor: COLORS.Light.hashBackGroundL2,
        width: "100%",
        borderRadius: 15,
    },
    title: {
        // color: COLORS.Light.deeperGreyColor,
        fontSize: SIZES.sizeSevenB,
        fontWeight: "600",
        marginVertical: "4%",
    },
    titleRef: {
        fontSize: SIZES.sizeSix,
        fontWeight: "500",
        marginVertical: "2%",
        color: COLORS.Light.gray,
        fontStyle: "italic",
    },
    textContent: {
        marginVertical: 25,
        fontSize: SIZES.sizeSixC,
        fontWeight: "400",
    },
    v3c: {
        backgroundColor: COLORS.Light.colorOneLight,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 70,
        marginRight: 10,
    },

    v3ct: {
        color: COLORS.Light.colorOne,
        fontWeight: "600",
        fontSize: SIZES.sizeEight,
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
        marginTop: 20,
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
});

{
    /* {!allowEdit && (
                <Text style={styles.textContent}>{fetchedNote?.text}</Text>
              )} */
}
{
    /* {allowEdit && (
                <View style={styles.headerRC2t2}>
                  <TextInput
                    mode="outlined"
                    // placeholder={"Search"}
                    placeholderTextColor={COLORS.Light.colorFour}
                    textContentType="none"
                    style={{ ...styles.inputContent }}
                    keyboardType="default"
                    autoCapitalize="none"
                    multiline
                    autoCorrect={false}
                    selectionColor={COLORS.Light.colorOne}
                    outlineColor={"transparent"}
                    activeOutlineColor={"transparent"}
                    value={noteText}
                    onChangeText={(val) => {
                      setNoteText(val);
                    }}
                    onFocus={() => {
                      setHideStatusBar(true);
                    }}
                    onBlur={() => {
                      setHideStatusBar(false);
                    }}
                  />
                </View>
              )} */
}

{
    /* {allowEdit && (
                  <View style={styles.headerRC2t2Title}>
                    <TextInput
                      mode="outlined"
                      // placeholder={"Search"}
                      placeholderTextColor={COLORS.Light.colorFour}
                      textContentType="none"
                      style={{ ...styles.inputContentTitle }}
                      keyboardType="default"
                      autoCapitalize="none"
                      multiline
                      autoCorrect={false}
                      selectionColor={COLORS.Light.colorOne}
                      outlineColor={"transparent"}
                      activeOutlineColor={"transparent"}
                      value={noteTitle}
                      onChangeText={(val) => {
                        setNoteTitle(val);
                      }}
                      onFocus={() => {
                        setHideStatusBar(true);
                      }}
                      onBlur={() => {
                        setHideStatusBar(false);
                      }}
                    />
                  </View>
                )} */
}
{
    /* <Text style={styles.titleRef}>
                  Daily Answer Devotional, {fetchedNote?.date}
                </Text> */
}

{
    /* <Text style={styles.dt}>{fetchedNote?.datetime}</Text> */
}

{
    /* {!hideOptions ? (
                          <Entypo
                            name="dots-three-vertical"
                            size={28}
                            color={COLORS.Light.gray}
                          />
                        ) : (
                          <Feather
                            name="x"
                            size={28}
                            color={COLORS.Light.colorFour}
                          />
                        )} */
}

{
    /* <TouchableOpacity style={styles.v1rbt1}>
                        <Entypo
                          name="share"
                          size={28}
                          color={COLORS.Light.gray}
                        />
                      </TouchableOpacity> */
}

{
    /* {allowEdit && (
                    <TouchableOpacity
                      style={styles.v3c}
                      onPress={() => {
                        updateOrAddNoteLocal();
                        setAllowEdit(!allowEdit);
                        setHideStatusBar(false);
                      }}
                    >
                      <Text style={styles.v3ct}>Done</Text>
                    </TouchableOpacity>
                  )} */
}

{
    /* {hideOptions && (
                <OptionsPopUp
                  xstyle={styles.xstyle}
                  bstyle={styles.bstyle}
                  children={
                    <>
                      {options.map((option, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.optionBody}
                          onPress={() => {
                            onClickOption(option.name);
                            setHideOptions(!hideOptions);
                          }}
                        >
                          <Text style={styles.optionText}>{option.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  }
                />
              )} */
}
