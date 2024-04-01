import {
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import React, {useEffect, useState} from "react";
import {Text, View} from "../../../components/Themed";
import {COLORS, IMAGES, SIZES} from "../../../constants/Colors";
import {MainButton} from "../../../components";
import {TextInput} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {screenNotificationActions} from "../../../store/slices/notification";
import {AppDispatch, RootState} from "../../../store";
import {MoreProps, MoreRoutes} from "../../../shared/const/routerMore";
import {Ionicons} from "@expo/vector-icons";
import {MainRoutes} from "../../../shared/const/routerMain";
import {RootRoutes, RootScreenProps} from "../../../shared/const/routerRoot";
import {CompositeScreenProps} from "@react-navigation/native";
import ValidateData from "../../../shared/lib/validateData";
import {validateObject} from "../../../shared/helper";
import {signInCall, updateUserPasswordCall} from "../../../store/apiThunks/user";
import {fetchAllVodCall} from "../../../store/apiThunks/vod";
import {fetchAllDevotionalCall, fetchUserDevotionalCall} from "../../../store/apiThunks/devotional";
import {fetchNoteByUserIdCall} from "../../../store/apiThunks/note";
import {fetchPrayerByUserIdCall} from "../../../store/apiThunks/prayer";
import {userActions} from "../../../store/slices/user";

// type NavigationProps = MoreProps<MoreRoutes.ChangePassword>;

type NavigationProps = CompositeScreenProps<
    MoreProps<MoreRoutes.ChangePassword>,
    RootScreenProps<RootRoutes.More>
>;

const ChangePassword: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
    const [emailErrorText, setEmailErrorText] = useState<string>("");
    const [hideCurrentPassword, setHideCurrentPassword] = useState<boolean>(true);
    const [hideNewPassword, setHideNewPassword] = useState<boolean>(true);
    const [errorCount, setErrorCount] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);


    const [hideStatusBar, setHideStatusBar] = useState<boolean>(false);
    const screenNotificationState = useSelector(
        (state: RootState) => state.screenNotification
    );
    const {screenLoading} = screenNotificationState;

    const filledFields = () => {
        return !!newPassword && !!currentPassword
    }

    const SCHEME = {
        newP: (newP: string) => ValidateData.special(newP),
        oldP: (oldP: string) => ValidateData.special(oldP),
    };

    type TypeValidation = {
        data: Record<keyof typeof SCHEME, { isValid: boolean }>;
        isValid: boolean;
    };

    let validation: TypeValidation = validateObject(
        {
            newP: newPassword,
            oldP: currentPassword,
        },
        // @ts-ignore
        SCHEME,
    );

    useEffect(() => {
        setErrorCount(errorCount + 1)
        validation = validateObject(
            {
                newP: newPassword,
                oldP: currentPassword,
            },
            // @ts-ignore
            SCHEME,
        );
        if (!validation.isValid && errorCount >= 1 && filledFields()) {
            setError(true)
        }
    }, [currentPassword, newPassword]);

    const handleContinue = async () => {
        validation = validateObject(
            {
                newP: newPassword,
                oldP: currentPassword,
            },
            // @ts-ignore
            SCHEME,
        );
        debug.log("validation", validation)
        if (!validation.isValid) {
            // setError(true)
            return;
        }
        await dispatch(updateUserPasswordCall(
            {
                updateUserPasswordRequest: {
                    oldPassword: currentPassword,
                    newPassword,
                }
            }
        )).unwrap()
            .then(async (res) => {
                debug.log("res", res)
                await dispatch(screenNotificationActions.updateScreenLoading(false));
                navigation?.navigate(RootRoutes.Main, {
                    screen: MainRoutes.Success,
                    params: {
                        mainText: "Password changed",
                        subText: "Your password has been changed successfully.",
                        btnText: "Done",
                        toScreen: RootRoutes.More,
                        toSubScreen: MoreRoutes.Settings,
                        toSubScreenParams: {},
                    },
                });
            }).catch((err) => {
                debug.error("err", err)
            }).finally(() => {
                dispatch(userActions.stopUserLoading())
            })
    }


    // useEffect(() => {
    //     if (screenLoading && route.name === "ChangePassword")
    //         setTimeout(async () => {
    //
    //         }, 2000);
    // }, [screenLoading]);

    return (
        <View style={styles.main}>
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
                                <Text style={styles.r1t2}>Change Password</Text>
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
                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>Current Password</Text>
                            <TextInput
                                mode="outlined"
                                // label={"Full Name"}
                                placeholder={"Current Password"}
                                placeholderTextColor={COLORS.Light.greyText}
                                textContentType="password"
                                secureTextEntry={hideCurrentPassword}
                                style={{...styles.inputContent}}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                // selectionColor={
                                //   // validEmail && allowEmailError
                                //   // ?
                                //   COLORS.Light.colorOne
                                //   // : COLORS.Light.colorFourteen
                                // }
                                // outlineColor={
                                //   !validEmail && allowEmailError
                                //     ? COLORS.Light.colorFourteen
                                //     : COLORS.Light.colorTwentySix
                                // }
                                // activeOutlineColor={
                                //   // validEmail
                                //   // ?
                                //   COLORS.Light.colorOne
                                //   // : COLORS.Light.colorFourteen
                                // }

                                selectionColor={
                                    validation?.data?.oldP.isValid && error
                                        ? COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                outlineColor={
                                    !validation?.data?.oldP.isValid && error
                                        ? COLORS.Light.colorFourteenC
                                        : COLORS.Light.colorTwentySix
                                }
                                activeOutlineColor={
                                    validation?.data?.oldP.isValid && error ?
                                        COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }

                                value={currentPassword}
                                onChangeText={(val) => {
                                    setCurrentPassword(val);
                                }}
                                right={
                                    <TextInput.Icon
                                        icon={hideCurrentPassword ? "eye-off" : "eye"}
                                        color={COLORS.Light.deepGreyColor}
                                        onPress={() => setHideCurrentPassword(!hideCurrentPassword)}
                                    />
                                }
                            />
                            {(!validation?.data?.oldP.isValid && error) &&
                                <Text style={styles.error}>{"Invalid Password"}</Text>}
                        </View>

                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>New Password</Text>
                            <TextInput
                                mode="outlined"
                                // label={"Full Name"}
                                placeholder={"New Password"}
                                placeholderTextColor={COLORS.Light.greyText}
                                textContentType="newPassword"
                                secureTextEntry={hideNewPassword}
                                style={{...styles.inputContent}}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                // selectionColor={
                                //   // validEmail && allowEmailError
                                //   // ?
                                //   COLORS.Light.colorOne
                                //   // : COLORS.Light.colorFourteen
                                // }
                                // outlineColor={
                                //   !validEmail && allowEmailError
                                //     ? COLORS.Light.colorFourteen
                                //     : COLORS.Light.colorTwentySix
                                // }
                                // activeOutlineColor={
                                //   // validEmail
                                //   // ?
                                //   COLORS.Light.colorOne
                                //   // : COLORS.Light.colorFourteen
                                // }

                                selectionColor={
                                    validation?.data?.newP.isValid && error
                                        ? COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                outlineColor={
                                    !validation?.data?.newP.isValid && error
                                        ? COLORS.Light.colorFourteenC
                                        : COLORS.Light.colorTwentySix
                                }
                                activeOutlineColor={
                                    validation?.data?.newP.isValid && error ?
                                        COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }

                                value={newPassword}
                                onChangeText={(val) => {
                                    setNewPassword(val);
                                }}
                                right={
                                    <TextInput.Icon
                                        icon={hideNewPassword ? "eye-off" : "eye"}
                                        color={COLORS.Light.deepGreyColor}
                                        onPress={() => setHideNewPassword(!hideNewPassword)}
                                    />
                                }
                            />
                            {(!validation?.data?.newP.isValid && error) &&
                                <Text style={styles.error}>{"Invalid Password"}</Text>}
                        </View>

                        <View style={styles.r8}>
                            <MainButton
                                title={"Continue"}
                                disabled={!filledFields()}
                                onPressFunction={() => {

                                    handleContinue()
                                    // navigation?.navigate(AuthRoutes.SignUp);
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
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default ChangePassword;

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
        // borderWidth: 1,
    },
    headerContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        // paddingBottom: 10,
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
        // paddingHorizontal: 15,
        paddingVertical: 9,
        flexDirection: "row",
        justifyContent: "space-around",
        // justifyContent: "center",
        // borderRadius: 40,
        backgroundColor: "transparent",
        alignItems: "center",
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
        width: "100%",
        backgroundColor: "transparent",
        // borderWidth: 1,
        height: "250%",
        alignItems: "center",
    },
    headerRC2t2Title: {
        width: "100%",
        backgroundColor: "transparent",
        // borderWidth: 1,
        // height: "250%",
        alignItems: "center",
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
        marginVertical: 10,
        fontSize: SIZES.sizeEight,
        lineHeight: 24,
    },
    inputContentTitle: {
        fontSize: SIZES.sizeNine,
        fontWeight: "600",
        marginVertical: "1%",
        color: COLORS.Light.colorFour,
        width: "100%",
        backgroundColor: "transparent",
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
        alignItems: "flex-start",
        backgroundColor: "transparent",
        // marginBottom: 50,
        paddingVertical: 5,
        paddingBottom: "10%",

        marginTop: "8%",
    },
    r1t2: {
        marginLeft: "8%",
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeEightA,
        fontWeight: "600",
        textAlign: "center",
    },
    v1rbt1: {},
    v1rbt2: {},
    v1rb: {
        flexDirection: "row",
        justifyContent: "space-between",

        width: "20%",
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
    // scroll: {
    //   // borderWidth: 1,
    //   width: "100%",
    //   marginTop: 10,
    //   backgroundColor: "transparent",
    //   marginBottom: 20,
    // },
    // scrollContent: {
    //   // borderWidth: 1,
    //   width: "100%",
    //   // height: "500%",
    //   alignItems: "center",
    //   backgroundColor: "transparent",
    //   marginBottom: 20,
    //   paddingVertical: 5,
    // },
    r1: {
        flexDirection: "row",
        // justifyContent: "center",
        width: "100%",
        alignItems: "center",
        marginBottom: "8%",
        backgroundColor: "transparent",
    },
    r1t1: {},
    // r1t2: {
    //   marginLeft: "8%",
    //   color: COLORS.Light.colorFour,
    //   fontSize: SIZES.sizeEight,
    //   fontWeight: "500",
    //   textAlign: "center",
    // },
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
        marginTop: 20,
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
    error: {
        color: COLORS.Light.colorFourteenC,
        fontSize: SIZES.sizeSix,
        fontWeight: "500",
        // textAlign: "center",
        marginLeft: 5
    },
    // inputContent: {
    //   fontSize: SIZES.sizeSeven,
    //   fontWeight: "500",
    //   color: COLORS.Light.colorTwentySeven,
    //   width: "100%",
    //   backgroundColor: COLORS.Light.background,
    //   marginBottom: 8,
    //   padding: 2,
    // },
});
