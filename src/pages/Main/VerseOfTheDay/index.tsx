import React, {useCallback, useEffect, useState} from "react";
import {Text, View} from "@components/Themed";
import {
    Platform,
    ScrollView, Share,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {COLORS, SIZES} from "@constants/Colors";
import {MainProps, MainRoutes} from "@shared/const/routerMain";
import {Entypo, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {MainButton} from "../../../components";
import {useSelector} from "react-redux";
import {RootState} from "@store/index";
import {GeneralVerseOfTheDayType} from "@shared/types/slices";
// import * as Speech from "expo-speech";
import Tts from 'react-native-tts';
import {RootRoutes, RootScreenProps} from "@shared/const/routerRoot";
import {DevotionalProps, DevotionalRoutes} from "@shared/const/routerDevotional";
import {CompositeScreenProps} from "@react-navigation/native";

// type NavigationProps = MainProps<MainRoutes.MainRoutes>;

type NavigationProps = CompositeScreenProps<
    MainProps<MainRoutes.VerseOfTheDay>,
    RootScreenProps<RootRoutes.Main>
>;

const VerseOfTheDay: React.FC<NavigationProps> = ({navigation, route}) => {
    const [currVOD, setCurrVod] = useState<GeneralVerseOfTheDayType>();
    const generalState = useSelector((state: RootState) => state.general);
    const {generalVerseOfTheDayList} = generalState;
    const [play, setPlay] = useState<boolean>(false);

    const {vodId} = route.params;

    const [words, setWords] = useState<string[]>([]);
    const [wordCount, setWordCount] = useState<number>(0);
    const [totalWordCount, setTotalWordCount] = useState<number>(0);

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [iosSelectedVoiceId, setIosSelectedVoiceId] = useState<string>("com.apple.speech.synthesis.voice.Fred");

    useEffect(() => {
        Tts.addEventListener('tts-start', (event) => {
            setIsSpeaking(true)
            debug.log("Speech started")
            debug.log("listener started", event)
        });

        Tts.addEventListener('tts-progress', (event) => {
            // setIsSpeaking(true)
            debug.log("listener in progress", event)
        });

        Tts.addEventListener('tts-finish', (event) => {
            setIsSpeaking(false)
            setPlay(false)
            Tts.stop()
            debug.log("listener finished", event)
        });

        Tts.addEventListener('tts-cancel', (event) => {
            setIsSpeaking(false)
            setPlay(false)
            Tts.stop()
            debug.log("listener cancelled", event)
        });

        return () => {
            // Tts?.removeEventListener('tts-start', () => setIsSpeaking(false));
            // Tts?.removeEventListener('tts-finish', () => setIsSpeaking(false));
            // Tts?.removeEventListener('tts-cancel', () => setIsSpeaking(false));
            Tts.stop()
        };
    }, []);

    // const handleWordCount = () => {
    //     setWordCount(wordCount + 1)
    // }

    useEffect(() => {

        if (Platform.OS === "ios") {
            const voiceName: string = "daniel"
            // Tts.setDefaultRate(Number(speed) * 0.3, false);
            Tts.voices().then(voices => {
                const selectedVoice = voices.find(voice =>
                    voice.id.toLowerCase().includes(voiceName));
                debug.log("selectedVoice", selectedVoice)
                if (selectedVoice) {
                    setIosSelectedVoiceId(selectedVoice.id)
                    Tts.setDefaultVoice(selectedVoice.id);
                } else {
                    setIosSelectedVoiceId("com.apple.speech.synthesis.voice.Fred")
                    Tts.setDefaultVoice("com.apple.speech.synthesis.voice.Fred"
                    );
                }
            });
        }

        if (Platform.OS === "android") {

            Tts.setDefaultRate(Number(1.25) * 0.3, false);
            Tts.voices().then(voices => {
                const selectedVoice = voices.find(voice => voice.language === 'en-US'
                    && voice.name.includes("en-us-x-iol-network"));
                if (selectedVoice) {
                    Tts.setDefaultVoice(selectedVoice.id);
                }
            });
        }

    }, [])


    const speak =
        useCallback(
            async (wc: number) => {
                Tts.speak(currVOD?.text || "", {
                    iosVoiceId: iosSelectedVoiceId
                    // voice === "Male" ?
                    //     "com.apple.speech.synthesis.voice.Albert"
                    //     :
                    // (Platform.OS === "ios" ? "com.apple.speech.synthesis.voice.Kathy" : "en-us-x-iog-local")
                    ,
                    rate: Number(1.25) * 0.3,
                    androidParams: {
                        KEY_PARAM_PAN: -1,
                        KEY_PARAM_VOLUME: 0.8,
                        KEY_PARAM_STREAM: 'STREAM_MUSIC',
                    },

                });
                // handleWordCount()
            }
            , [currVOD?.text, iosSelectedVoiceId])


    const togglePlay = async () => {
        // setWordCount(wordCount + 1)
        // const isSpeaking = await Speech.isSpeakingAsync();
        if (isSpeaking) {
            if (Platform.OS === "ios") {
                if (!play) {
                    debug.log("Trying to resume speech")
                    await Tts.resume()
                    debug.log("Speech resumed")
                    setPlay(true);
                } else {
                    debug.log("Trying to pause speech")
                    await Tts.pause()
                    debug.log("Speech paused")
                    setPlay(false);
                }
            } else {
                if (!play) {
                    debug.log("Trying to start speech")
                    setPlay(true);
                    await speak(wordCount)
                } else {
                    debug.log("Trying to stop speech")
                    await Tts.stop()
                    debug.log("Speech stopped")
                    setPlay(false);
                }
            }

        } else {
            setPlay(true);
            speak(wordCount)
        }
    };

    useEffect(() => {
        if (!currVOD) {
            return;
        }
        const thingToSay = currVOD.text
        debug.log("speaking", thingToSay)
        if (thingToSay?.trim() === '') {
            return;
        }
        const wordSplit = thingToSay?.split(' ') || [];
        setWords(wordSplit)
        setTotalWordCount(wordSplit.length);
        // Speech.getAvailableVoicesAsync().then((res) => {
        //     const englishVoices = res.filter((voice, _) => voice.language === "en-US")
        //     // debug.log("res from text to speech", englishVoices)
        // })
        // debug.log("totalwordCount", wordSplit.length)
        // debug.log("words", wordSplit)
        // debug.log("wordCount", wordCount)
    }, [currVOD]);

    useEffect(() => {
        setCurrVod(generalVerseOfTheDayList[vodId] || null);
    }, []);

    const shareData = async (val: string) => {
        try {
            await Share.share({
                title: "General Verse of the Day",
                message: val,

            }, {
                dialogTitle: "BAM: General VOD",
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
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerC1}>
                            <View style={styles.r1}>
                                <TouchableOpacity
                                    style={styles.r1t1}
                                    onPress={() => {
                                        // navigation?.navigate(MainRoutes.HomeScreen);
                                        navigation?.goBack();
                                    }}
                                >
                                    <Ionicons
                                        name="arrow-back-sharp"
                                        size={24}
                                        color={COLORS.Light.colorFour}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.r1t2}>Memory Verse</Text>
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
                        <Text style={styles.r2}>
                            <Text style={styles.r2t1}>
                                {currVOD?.verse.split(":")[1].split(" ")[0]}{" "}
                            </Text>
                            <Text style={styles.r2t2}>{currVOD?.text}</Text>
                        </Text>
                        <TouchableOpacity style={styles.r3}>
                            <Text style={styles.r3t}>{currVOD?.verse}</Text>
                        </TouchableOpacity>
                        <View style={styles.r8}>
                            <MainButton
                                title={"Go to devotional"}
                                onPressFunction={() => {
                                    // navigation?.navigate(AuthRoutes.SignUp);
                                    navigation?.navigate(RootRoutes.Devotional, {
                                        screen: DevotionalRoutes.MainDevotional,
                                    });
                                }}
                                err={false}
                                btnStyle={styles.r8t1}
                                // disabled={!proceed}
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.floatingContainer}>
                        <TouchableOpacity style={styles.floatingContent1}>
                            <Text style={styles.fc1t}>{currVOD?.verse}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.floatingContent2}
                            onPress={() => {
                                togglePlay();
                            }}

                        >
                            <Text style={[styles.fc2t, play && {marginLeft: "1%"}]}>
                                <FontAwesome5
                                    name={!play ? "play" : (Platform.OS === "ios" ? "pause" : "stop")}
                                    size={28}
                                    color={COLORS.Light.background}
                                />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.floatingContent3}
                            onPress={() => {
                                shareData((currVOD?.text || "") + " [" + (currVOD?.verse || "") + "]")
                            }}
                        >
                            <Text style={styles.fc3t}>
                                <Entypo name="share" size={30} color={COLORS.Light.colorOne}/>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default VerseOfTheDay;

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
        height: "14%",
        shadowColor: COLORS.Light.deeperGreyColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        zIndex: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerC1: {
        justifyContent: "space-around",
    },
    r1: {
        flexDirection: "row",
        // justifyContent: "center",
        width: "100%",
        alignItems: "center",
        marginBottom: "4%",
        backgroundColor: "transparent",
    },
    r1t1: {},
    r1t2: {
        marginLeft: "8%",
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeEight,
        fontWeight: "600",
        textAlign: "center",
    },
    bodyContainer: {
        // borderWidth: 1,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.Light.background,
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
        alignItems: "center",
        backgroundColor: "transparent",
        // marginBottom: 50,
        paddingVertical: 5,
        paddingBottom: "10%",

        marginTop: "8%",
    },
    r8: {
        marginBottom: 10,
        backgroundColor: "transparent",
        paddingVertical: 5,
        width: "100%",
    },
    r8t1: {},
    r2: {
        width: "100%",
        flexDirection: "row",
        // borderWidth: 1,
        marginBottom: 10,
    },
    r2t1: {
        lineHeight: 28,
        fontSize: SIZES.sizeSeven,
        fontWeight: "400",
        color: COLORS.Light.colorThirteen,
    },
    r2t2: {
        color: COLORS.Light.colorFourteen,
        fontSize: SIZES.sizeSeven,
        fontWeight: "400",
        fontFamily: "Bitter",
        lineHeight: 28,
    },
    r3: {
        alignItems: "flex-end",
        width: "100%",
        marginBottom: 50,
    },
    r3t: {
        color: COLORS.Light.deeperGreyColor,
        fontWeight: "500",
        fontSize: SIZES.sizeSix,
    },
    floatingContainer: {
        // borderWidth: 1,
        height: 50,
        width: "100%",
        position: "absolute",
        top: "90%",
        left: "5%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    floatingContent1: {
        height: 50,
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
    fc3t: {},
});
