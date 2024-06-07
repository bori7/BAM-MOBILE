import {
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import React, {useCallback, useEffect, useState} from "react";
import {Text, View} from "@components/Themed";
import {AuthProps, AuthRoutes} from "@shared/const/routerAuth";
import {COLORS, IMAGES, SIZES} from "@constants/Colors";
import {MainButton} from "../../../components";
import CancelIcon from "@shared/assets/images/svg/iconoir_cancel.svg";
import {TextInput} from "react-native-paper";
import AppleLogo from "../../../shared/assets/images/svg/Apple.svg";
import {useDispatch, useSelector} from "react-redux";
import {screenNotificationActions} from "@store/slices/notification";
import {AppDispatch, RootState} from "@store/index";
import {
    CommonActions,
    CompositeScreenProps,
    useFocusEffect,
} from "@react-navigation/native";
import {RootRoutes, RootScreenProps} from "@shared/const/routerRoot";
import {MainRoutes} from "@shared/const/routerMain";
import ValidateData from "../../../shared/lib/validateData";
import {validateObject} from "@shared/helper";
import {signInCall, signUpCall} from "@store/apiThunks/user";
import {fetchAllVodCall} from "@store/apiThunks/vod";
import {userActions} from "@store/slices/user";
import {fetchAllDevotionalCall, fetchUserDevotionalCall} from "@store/apiThunks/devotional";
import {fetchNoteByUserIdCall} from "@store/apiThunks/note";
import {fetchPrayerByUserIdCall} from "@store/apiThunks/prayer";
import {fetchLiveSubscriptionCall} from "@store/apiThunks/payment";
import {CancelIconSVG} from "@shared/components/SVGS";
import biometrics from "@shared/lib/biometrics";

// type NavigationProps = CompositeScreenProps<
//   RootScreenProps<RootRoutes.Main>,
//   AuthProps<AuthRoutes.SignIn>
// >;

type NavigationProps = AuthProps<AuthRoutes.SignIn>;

const SignIn: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    // const [email, setEmail] = useState<string>("");
    // const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // const [validEmail, setValidEmail] = useState<boolean>(false);
    // const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
    // const [emailErrorText, setEmailErrorText] = useState<string>("");
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [errorCount, setErrorCount] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);

    // const screenNotificationState = useSelector(
    //     (state: RootState) => state.screenNotification
    // );
    // const {screenLoading} = screenNotificationState;

    const resetAction = CommonActions.reset({
        index: 1,
        routes: [
            {
                name: RootRoutes.Main,
                params: {
                    screen: MainRoutes.HomeScreen,
                },
            },
        ],
    });

    // useFocusEffect(() => {
    //     if (screenLoading)
    //         setTimeout(async () => {
    //             await dispatch(screenNotificationActions.updateScreenLoading(false));
    //             navigation?.dispatch(resetAction);
    //         }, 2000);
    // });

    const setBiometricData = async () => {

        await biometrics.setDataBiometricUser(fullName, password);
    };

    const SCHEME = {
        user: (user: string) => user?.length >= 4,
        password: (password: string) => ValidateData.special(password),
    };

    type TypeValidation = {
        data: Record<keyof typeof SCHEME, { isValid: boolean }>;
        isValid: boolean;
    };

    let validation: TypeValidation = validateObject(
        {
            user: fullName,
            password: password,
        },
        // @ts-ignore
        SCHEME,
    );

    const handleContinue = async () => {
        validation = validateObject(
            {
                user: fullName,
                password: password,
            },
            // @ts-ignore
            SCHEME,
        );
        debug.log("validation", validation)
        if (!validation.isValid) {
            // setError(true)
            return;
        }
        await dispatch(signInCall(
            {
                signInRequest: {
                    password,
                    user: fullName,
                }
            }
        )).unwrap()
            .then(async (res) => {
                debug.log("res", res)
                await dispatch(fetchLiveSubscriptionCall({
                    fetchLiveSubscriptionRequest: {}
                }))
                await dispatch(fetchAllVodCall(
                    {fetchAllVodRequest: null}
                )).unwrap()
                await dispatch(fetchAllDevotionalCall({fetchAllDevotionalRequest: null})).unwrap()
                await dispatch(fetchUserDevotionalCall({fetchUserDevotionalRequest: null})).unwrap()
                // .catch((err) => {
                //     debug.error("err from fetchUserDevotionalCall in SignIn Screen", err)
                // })
                await dispatch(fetchNoteByUserIdCall({fetchNoteByIdRequest: null})).unwrap()
                    .catch((err) => {
                        debug.log("err from  fetchNoteByUserIdCall unwrap", err)
                    })
                await dispatch(fetchPrayerByUserIdCall({fetchPrayerByIdRequest: null})).unwrap()
                    .catch((err) => {
                        debug.log("err from fetchPrayerByUserIdCall unwrap", err)
                    })

                navigation?.dispatch(resetAction);
                setBiometricData();
            }).catch((err) => {
                debug.error("err while  signing in", err)
            }).finally(() => {
                dispatch(userActions.stopUserLoading())
            })
    }

    const filledFields = () => {
        return !!password && !!fullName
    }

    const checkBiometrics = useCallback(async () => {
        try {
            const data = await biometrics.getPassword("");
            setFullName(data?.username || "");
            setPassword(data?.password || "");
        } catch (e) {
            debug.error('e in checkBiometrics', e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        checkBiometrics();

    }, []);

    useEffect(() => {
        setErrorCount(errorCount + 1)
        validation = validateObject(
            {
                user: fullName,
                password: password,
            },
            // @ts-ignore
            SCHEME,
        );
        if (!validation.isValid && errorCount >= 1 && filledFields()) {
            setError(true)
        }
    }, [password, fullName]);

    return (
        <View style={styles.main}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        style={styles.scroll}
                    >
                        <View style={styles.r1}>
                            <TouchableOpacity
                                style={styles.r1t1}
                                onPress={() => {
                                    navigation?.navigate(AuthRoutes.DaDBSwiper);
                                }}
                            >
                                <CancelIconSVG
                                    width={30} height={30}
                                    color={COLORS.Light.background}
                                    stroke={COLORS.Light.colorFour}
                                />
                                {/*<CancelIcon width={30} height={30}/>*/}
                            </TouchableOpacity>
                            <Text style={styles.r1t2}>Sign In</Text>
                        </View>
                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>Username/Email</Text>
                            <TextInput
                                mode="outlined"
                                // label={"Full Name"}
                                placeholder={"Enter username/email"}
                                placeholderTextColor={COLORS.Light.greyText}
                                textContentType="emailAddress"
                                style={{...styles.inputContent}}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor={
                                    validation?.data?.user.isValid && error
                                        ? COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                outlineColor={
                                    !validation?.data?.user.isValid && error
                                        ? COLORS.Light.colorFourteenC
                                        : COLORS.Light.colorTwentySix
                                }
                                activeOutlineColor={
                                    validation?.data?.user.isValid && error ?
                                        COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                value={fullName}
                                onChangeText={(val) => {
                                    setFullName(val);
                                }}
                            />
                            {
                                (!validation?.data?.user.isValid && error) &&
                                <Text style={styles.error}>{"Invalid username/email"}</Text>}
                        </View>

                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>Password</Text>
                            <TextInput
                                mode="outlined"
                                // label={"Full Name"}
                                placeholder={"password"}
                                placeholderTextColor={COLORS.Light.greyText}
                                textContentType="password"
                                secureTextEntry={hidePassword}
                                style={{...styles.inputContent}}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor={
                                    validation?.data?.password.isValid && error ?
                                        COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                outlineColor={
                                    !validation?.data?.password.isValid && error
                                        ? COLORS.Light.colorFourteenC
                                        : COLORS.Light.colorTwentySix
                                }
                                activeOutlineColor={
                                    validation?.data?.password.isValid && error ?
                                        COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                value={password}
                                onChangeText={(val) => {
                                    setPassword(val);
                                }}
                                right={
                                    <TextInput.Icon
                                        icon={hidePassword ? "eye-off" : "eye"}
                                        color={COLORS.Light.deepGreyColor}
                                        onPress={() => setHidePassword(!hidePassword)}
                                    />
                                }
                            />
                            {
                                (!validation?.data?.password.isValid && error) &&
                                <Text style={styles.error}>{"Invalid Password"}</Text>}

                        </View>

                        <TouchableOpacity
                            style={styles.fp}
                            onPress={() => {
                                navigation?.navigate(AuthRoutes.ForgotPassword);
                            }}
                        >
                            <Text style={styles.fpt}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={styles.r8}>
                            <MainButton
                                title={"Continue"}
                                disabled={!filledFields()}
                                onPressFunction={() => {
                                    // navigation?.navigate(AuthRoutes.SignUp);
                                    handleContinue()
                                    // dispatch(
                                    //   screenNotificationActions.updateScreenLoadingFunc({
                                    //     screenLoading: true,
                                    //     screenFunction: () => {
                                    //       // console.log("Inside screen function");
                                    //       // dispatch(
                                    //       //   screenNotificationActions.updateScreenLoadingFunc({
                                    //       //     screenLoading: false,
                                    //       //     screenFunction: () => {},
                                    //       //   })
                                    //       // );
                                    //       // console.log("After screen function");
                                    //       // navigation?.navigate(AuthRoutes.SignIn);
                                    //     },
                                    //   })
                                    // );
                                }}
                                err={false}
                                btnStyle={styles.r8t1}
                                // disabled={!proceed}
                            />
                        </View>
                        {/*          TODO: MVP2*/}
                        {/*<View style={styles.r9}>*/}
                        {/*    <Text style={styles.r9t1}>or sign in with</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.r10}>*/}
                        {/*    <TouchableOpacity style={styles.r10t1}>*/}
                        {/*        <Image*/}
                        {/*            source={IMAGES.googleLogo}*/}
                        {/*            // style={styles.r2t}*/}
                        {/*        />*/}
                        {/*    </TouchableOpacity>*/}
                        {/*    <TouchableOpacity style={styles.r10t1}>*/}
                        {/*        <AppleLogo/>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*    <TouchableOpacity style={styles.r10t1}>*/}
                        {/*        <Image*/}
                        {/*            source={IMAGES.facebookLogo}*/}
                        {/*            // style={styles.r2t}*/}
                        {/*        />*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}
                        <View style={styles.r7}>
                            <Text style={styles.r7t1}>Don’t have an account? </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation?.navigate(AuthRoutes.SignUp);
                                }}
                            >
                                <Text style={styles.r7t2}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // borderWidth: 1,
    },
    container: {
        // borderWidth: 1,
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        marginHorizontal: "5%",
    },
    subContainer: {
        // flex: 1,
        // borderWidth: 1,
        // justifyContent: "center",
        alignItems: "center",
        // height: "60%",
        width: "100%",
        marginTop: "15%",
        // paddingHorizontal: "5%",
    },
    scroll: {
        // borderWidth: 1,
        width: "100%",
        marginTop: 10,
        backgroundColor: "transparent",
        marginBottom: 20,
    },
    scrollContent: {
        // borderWidth: 1,
        width: "100%",
        // height: "500%",
        alignItems: "center",
        backgroundColor: "transparent",
        marginBottom: 20,
        paddingVertical: 5,
    },
    r1: {
        flexDirection: "row",
        // justifyContent: "center",
        width: "100%",
        alignItems: "center",
        marginBottom: "8%",
        backgroundColor: "transparent",
    },
    r1t1: {},
    r1t2: {
        marginLeft: "8%",
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeEight,
        fontWeight: "500",
        textAlign: "center",
    },
    r2: {
        width: "100%",
        marginVertical: 20,
    },
    r2t1: {},
    r3: {
        width: "100%",
        marginTop: 5,
        marginBottom: 15,
    },
    r3t1: {
        marginBottom: 18,
        fontWeight: "300",
        fontSize: SIZES.sizeSeven,
    },

    r8: {
        marginBottom: 10,
        backgroundColor: "transparent",
        paddingVertical: 5,
        width: "100%",
    },
    r8t1: {},
    fp: {
        marginTop: 10,
        marginBottom: 30,
        // borderWidth: 1,
        width: "100%",
        alignItems: "flex-end",
    },
    fpt: {
        color: COLORS.Light.deepGreyColor,
    },
    r9: {
        marginVertical: 10,
    },
    r9t1: {
        fontSize: SIZES.sizeSeven,
        fontWeight: "300",
        color: COLORS.Light.deeperGreyColor,
    },
    r10: {
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "65%",
    },
    r10t1: {
        height: 60,
        width: 60,
        // borderWidth: 1,
        backgroundColor: COLORS.Light.hashBackGround,
        // marginHorizontal: 10,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    r7: {
        width: "100%",
        backgroundColor: "transparent",
        flexDirection: "row",
        marginTop: "7%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    r7t1: {
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeSix,
        fontWeight: "500",
        textAlign: "center",
    },
    r7t2: {
        color: COLORS.Light.colorOne,
        fontSize: SIZES.sizeSix,
        fontWeight: "500",
        textAlign: "center",
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
    error: {
        color: COLORS.Light.colorFourteenC,
        fontSize: SIZES.sizeSix,
        fontWeight: "500",
        // textAlign: "center",
        marginLeft: 5
    },
});
