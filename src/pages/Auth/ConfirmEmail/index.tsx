import {
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import React, {useEffect, useState} from "react";
import {Text, View} from "@components/Themed";
import {AuthProps, AuthRoutes} from "@shared/const/routerAuth";
import {COLORS, IMAGES, SIZES} from "@constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@store/index";
import {CancelIconSVG, SendMailImageSVG} from "@shared/components/SVGS";
import {ConfirmationCode} from "@shared/components/ConfirmationCode";
import { verificationVerificationCodeCall} from "@store/apiThunks/user";

type NavigationProps = AuthProps<AuthRoutes.ConfirmEmail>;

const ConfirmEmail: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [hidePassword, setHidePassword] = useState<boolean>(true);

    const userState = useSelector(
        (state: RootState) => state.user
    );
    const {userError} = userState;

    const verifyCode = async () => {

        await dispatch(
            verificationVerificationCodeCall({
                verifyVerificationCodeRequest: {
                    code: code,
                }
            })
        ).unwrap()
            .then(res => {
                navigation?.navigate(AuthRoutes.NewPassword);
            })
            .catch((err) => {
                debug.error("err from verifyCode func", err)
                setErrorText(err?.response?.data?.message || "Invalid Code")
            })
    }

    useEffect(() => {
        setErrorText("")
        if (code?.length == 6) {
            verifyCode()
        }
    }, [code]);


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
                        </View>
                        <View style={styles.r2}>
                            <Text style={styles.r2t1}>Confirm Email</Text>
                            <Text style={styles.r2t2}>
                                We’ve sent the password reset instructions to your email. Tap
                                the link in that email to confirm that’s you
                            </Text>
                        </View>
                        <ConfirmationCode
                            value={code}
                            setValue={(val) => {
                                setCode(val)
                            }}
                            error={!!errorText}
                            errorMessage={errorText}
                        />
                        <View style={styles.r3}>
                            <SendMailImageSVG
                                // fill={"white"}
                            />
                        </View>
                        <View style={styles.r7}>
                            <Text style={styles.r7t1}>Didn’t receive a mail? </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation?.goBack();
                                }}
                            >
                                <Text style={styles.r7t2}> Resend mail</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default ConfirmEmail;

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
        alignItems: "center",
        justifyContent: "center",
    },
    r2t1: {
        color: COLORS.Light.colorFour,
        fontSize: SIZES.sizeEight,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10,
    },
    r2t2: {
        marginTop: 20,
        marginBottom: 40,
        textAlign: "center",
    },
    r3: {
        // width: "100%",
        marginVertical: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
        // borderWidth: 1,
        backgroundColor: COLORS.Light.colorFifteen,
        padding: 10,
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
});
