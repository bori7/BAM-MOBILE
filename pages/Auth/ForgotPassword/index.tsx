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
import {AppDispatch, RootState} from "../../../store";
import ValidateData from "../../../shared/lib/validateData";
import {validateObject} from "../../../shared/helper";
import {userActions} from "../../../store/slices/user";
import {generateVerificationCodeCall} from "../../../store/apiThunks/user";

type NavigationProps = AuthProps<AuthRoutes.ForgotPassword>;

const ForgotPassword: React.FC<NavigationProps> = ({navigation, route}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState<string>("");
    const [errorCount, setErrorCount] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);


    const userState = useSelector(
        (state: RootState) => state.user
    );
    const {userData} = userState;

    const SCHEME = {
        email: (email: string) => ValidateData.email(email),
    };

    type TypeValidation = {
        data: Record<keyof typeof SCHEME, { isValid: boolean }>;
        isValid: boolean;
    };

    let validation: TypeValidation = validateObject(
        {
            email: email
        },
        // @ts-ignore
        SCHEME,
    );


    const handleSend = async () => {

        validation = validateObject(
            {
                email: email,
            },
            // @ts-ignore
            SCHEME,
        );

        debug.log("validation", validation)
        if (!validation.isValid) {
            // setError(true)
            return;
        }
        dispatch(userActions.updateUserData({
            ...userData,
            email_address: email
        }))

        await dispatch(
            generateVerificationCodeCall({
                generateVerificationCodeRequest: {
                    emailAddress: email
                }
            })
        ).unwrap()
            .then(res => {
                navigation?.navigate(AuthRoutes.ConfirmEmail);
            })
            .catch(()=>{

            })


    }

    const filledFields = () => {
        return !!email
        // return ValidateData.email(email)
    }

    useEffect(() => {
        setErrorCount(errorCount + 1)
        validation = validateObject(
            {
                email: email,
            },
            // @ts-ignore
            SCHEME,
        );
        if (!validation.isValid && filledFields()) {
            setError(true)
        }
    }, [email]);

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
                                <CancelIcon width={30} height={30}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.r2}>
                            <Text style={styles.r2t1}>Forgot your password?</Text>
                            <Text style={styles.r2t2}>
                                No problem! Just enter your email address, and we’ll send a code
                                to reset your password.
                            </Text>
                        </View>
                        <View style={styles.r3}>
                            <Text style={styles.r3t1}>Email</Text>
                            <TextInput
                                mode="outlined"
                                // label={"Full Name"}
                                placeholder={"Enter email"}
                                placeholderTextColor={COLORS.Light.greyText}
                                textContentType="emailAddress"
                                style={{...styles.inputContent}}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                // selectionColor={
                                //     // validEmail && allowEmailError
                                //     // ?
                                //     COLORS.Light.colorOne
                                //     // : COLORS.Light.colorFourteen
                                // }
                                // outlineColor={
                                //     !validEmail && allowEmailError
                                //         ? COLORS.Light.colorFourteen
                                //         : COLORS.Light.colorTwentySix
                                // }
                                // activeOutlineColor={
                                //     // validEmail
                                //     // ?
                                //     COLORS.Light.colorOne
                                //     // : COLORS.Light.colorFourteen
                                // }
                                selectionColor={
                                    validation?.data?.email.isValid && error
                                        ?
                                        COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                outlineColor={
                                    !validation?.data?.email.isValid && error
                                        ? COLORS.Light.colorFourteenC
                                        : COLORS.Light.colorTwentySix
                                }
                                activeOutlineColor={
                                    validation?.data?.email.isValid
                                        ?
                                        COLORS.Light.colorOne
                                        : COLORS.Light.colorFourteenC
                                }
                                value={email}
                                onChangeText={(val) => {
                                    setEmail(val);
                                }}
                            />
                            {(!validation?.data?.email.isValid && error) &&
                                <Text style={styles.error}>{"Invalid Email"}</Text>}
                        </View>

                        <View style={styles.r8}>
                            <MainButton
                                disabled={!validation?.data?.email.isValid}
                                title={"Send"}
                                onPressFunction={() => {
                                    handleSend()

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

export default ForgotPassword;

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
        width: "100%",
        marginTop: 5,
        marginBottom: 45,
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
