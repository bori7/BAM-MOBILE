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
import {AuthProps, AuthRoutes} from "../../../shared/const/routerAuth";
import {COLORS, IMAGES, SIZES} from "../../../constants/Colors";
import {MainButton} from "../../../components";
import CancelIcon from "../../../shared/assets/images/svg/iconoir_cancel.svg";
import {TextInput} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {screenNotificationActions} from "../../../store/slices/notification";
import {AppDispatch, RootState} from "../../../store";
import ValidateData from "../../../shared/lib/validateData";
import {validateObject} from "../../../shared/helper";
import {resetUserPasswordCall, updateUserPasswordCall} from "../../../store/apiThunks/user";
import {RootRoutes} from "../../../shared/const/routerRoot";
import {MainRoutes} from "../../../shared/const/routerMain";
import {MoreRoutes} from "../../../shared/const/routerMore";
import {userActions} from "../../../store/slices/user";
import {CancelIconSVG} from "@shared/components/SVGS";

type NavigationProps = AuthProps<AuthRoutes.NewPassword>;

const NewPassword: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
    const [emailErrorText, setEmailErrorText] = useState<string>("");
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);
    const [errorCount, setErrorCount] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);


    const screenNotificationState = useSelector(
        (state: RootState) => state.screenNotification
    );
    const {screenLoading} = screenNotificationState;

    // useEffect(() => {
    //     if (screenLoading && route.name === "NewPassword")
    //         setTimeout(async () => {
    //             await dispatch(screenNotificationActions.updateScreenLoading(false));
    //             navigation?.navigate(AuthRoutes.SignIn);
    //         }, 2000);
    // }, [screenLoading]);

    const filledFields = () => {
        return !!confirmPassword && !!password
    }

    const SCHEME = {
        newP: (newP: string) => ValidateData.special(newP),
        confirmP: (confirmP: string) => password === confirmPassword
    };

    type TypeValidation = {
        data: Record<keyof typeof SCHEME, { isValid: boolean }>;
        isValid: boolean;
    };

    let validation: TypeValidation = validateObject(
        {
            newP: password,
            confirmP: confirmPassword,
        },
        // @ts-ignore
        SCHEME,
    );

    useEffect(() => {
        setErrorCount(errorCount + 1)
        validation = validateObject(
            {
                newP: password,
                confirmP: confirmPassword,
            },
            // @ts-ignore
            SCHEME,
        );
        if (!validation.isValid && errorCount >= 1 && filledFields()) {
            setError(true)
        }
    }, [password, confirmPassword]);

    const handleContinue = async () => {
        validation = validateObject(
            {
                newP: password,
                confirmP: confirmPassword,
            },
            // @ts-ignore
            SCHEME,
        );
        debug.log("validation", validation)
        if (!validation.isValid) {
            // setError(true)
            return;
        }
        await dispatch(resetUserPasswordCall(
            {
                resetUserPasswordRequest: {
                    newPassword: password
                }
            }
        )).unwrap()
            .then(async (res) => {
                debug.log("res", res)
                dispatch(screenNotificationActions.updateScreenLoading(false));
                navigation?.navigate(AuthRoutes.SignIn);
            }).catch((err) => {
                debug.error("err", err)
            }).finally(() => {
                dispatch(userActions.stopUserLoading())
            })
    }

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
                                    navigation?.navigate(AuthRoutes.SignIn);
                                }}
                            >
                                <CancelIconSVG
                                    width={30} height={30}
                                    color={COLORS.Light.background}
                                    stroke={COLORS.Light.colorFour}
                                />
                                {/*<CancelIcon width={30} height={30}/>*/}
                            </TouchableOpacity>
                            <Text style={styles.r1t2}>New Password</Text>
                        </View>

                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>New Password</Text>
                            <TextInput
                                textColor={COLORS.Light.colorFour}
                                mode="outlined"
                                // label={"Full Name"}
                                placeholder={"new password"}
                                placeholderTextColor={COLORS.Light.greyText}
                                textContentType="password"
                                secureTextEntry={hidePassword}
                                style={{...styles.inputContent}}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
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
                            {(!validation?.data?.newP.isValid && error) &&
                                <Text style={styles.error}>{"Invalid Password"}</Text>}
                        </View>

                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>Confirm Password</Text>
                            <TextInput
                                mode="outlined"
                                textColor={COLORS.Light.colorFour}
                                // label={"Full Name"}
                                placeholder={"confirm password"}
                                placeholderTextColor={COLORS.Light.greyText}
                                textContentType="newPassword"
                                secureTextEntry={hideConfirmPassword}
                                style={{...styles.inputContent}}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                selectionColor={
                                    validation?.data?.confirmP.isValid && error
                                        ? COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                outlineColor={
                                    !validation?.data?.confirmP.isValid && error
                                        ? COLORS.Light.colorFourteenC
                                        : COLORS.Light.colorTwentySix
                                }
                                activeOutlineColor={
                                    validation?.data?.confirmP.isValid && error ?
                                        COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }

                                value={confirmPassword}
                                onChangeText={(val) => {
                                    setConfirmPassword(val);
                                }}
                                right={
                                    <TextInput.Icon
                                        icon={hideConfirmPassword ? "eye-off" : "eye"}
                                        color={COLORS.Light.deepGreyColor}
                                        onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                                    />
                                }
                            />
                            {(!validation?.data?.confirmP.isValid && error) &&
                                <Text style={styles.error}>{"Invalid Password"}</Text>}
                        </View>

                        <View style={styles.r8}>
                            <MainButton
                                title={"Continue"}
                                onPressFunction={() => {
                                    handleContinue()

                                }}
                                err={false}
                                btnStyle={styles.r8t1}
                                disabled={!filledFields()}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default NewPassword;

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
