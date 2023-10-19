import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { AuthProps, AuthRoutes } from "../../../shared/const/routerAuth";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { MainButton } from "../../../components";
import CancelIcon from "../../../shared/assets/images/svg/iconoir_cancel.svg";
import { TextInput } from "react-native-paper";
import AppleLogo from "../../../shared/assets/images/svg/Apple.svg";
import { useDispatch, useSelector } from "react-redux";
import { screenNotificationActions } from "../../../store/slices/notification";
import { AppDispatch, RootState } from "../../../store";
import {
  CommonActions,
  CompositeScreenProps,
  useFocusEffect,
} from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "../../../shared/const/routerRoot";
import { MainRoutes } from "../../../shared/const/routerMain";

type NavigationProps = CompositeScreenProps<
  RootScreenProps<RootRoutes.Main>,
  AuthProps<AuthRoutes.SignIn>
>;

const SignIn: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const screenNotificationState = useSelector(
    (state: RootState) => state.screenNotification
  );
  const { screenLoading } = screenNotificationState;

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

  useFocusEffect(() => {
    if (screenLoading)
      setTimeout(async () => {
        await dispatch(screenNotificationActions.updateScreenLoading(false));
        navigation?.dispatch(resetAction);
      }, 2000);
  });

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" />
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
                  navigation?.navigate(AuthRoutes.GFA);
                }}
              >
                <CancelIcon width={30} height={30} />
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
                style={{ ...styles.inputContent }}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor={
                  // validEmail && allowEmailError
                  // ?
                  COLORS.Light.colorOne
                  // : COLORS.Light.colorFourteen
                }
                outlineColor={
                  !validEmail && allowEmailError
                    ? COLORS.Light.colorFourteen
                    : COLORS.Light.colorTwentySix
                }
                activeOutlineColor={
                  // validEmail
                  // ?
                  COLORS.Light.colorOne
                  // : COLORS.Light.colorFourteen
                }
                value={fullName}
                onChangeText={(val) => {
                  setFullName(val);
                }}
              />
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
                style={{ ...styles.inputContent }}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor={
                  // validEmail && allowEmailError
                  // ?
                  COLORS.Light.colorOne
                  // : COLORS.Light.colorFourteen
                }
                outlineColor={
                  !validEmail && allowEmailError
                    ? COLORS.Light.colorFourteen
                    : COLORS.Light.colorTwentySix
                }
                activeOutlineColor={
                  // validEmail
                  // ?
                  COLORS.Light.colorOne
                  // : COLORS.Light.colorFourteen
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
                onPressFunction={() => {
                  // navigation?.navigate(AuthRoutes.SignUp);
                  dispatch(
                    screenNotificationActions.updateScreenLoadingFunc({
                      screenLoading: true,
                      screenFunction: () => {
                        // console.log("Inside screen function");
                        // dispatch(
                        //   screenNotificationActions.updateScreenLoadingFunc({
                        //     screenLoading: false,
                        //     screenFunction: () => {},
                        //   })
                        // );
                        // console.log("After screen function");
                        // navigation?.navigate(AuthRoutes.SignIn);
                      },
                    })
                  );
                }}
                err={false}
                btnStyle={styles.r8t1}
                // disabled={!proceed}
              />
            </View>
            <View style={styles.r9}>
              <Text style={styles.r9t1}>or sign in with</Text>
            </View>
            <View style={styles.r10}>
              <TouchableOpacity style={styles.r10t1}>
                <Image
                  source={IMAGES.googleLogo}
                  // style={styles.r2t}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.r10t1}>
                <AppleLogo />
              </TouchableOpacity>
              <TouchableOpacity style={styles.r10t1}>
                <Image
                  source={IMAGES.facebookLogo}
                  // style={styles.r2t}
                />
              </TouchableOpacity>
            </View>
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
});
