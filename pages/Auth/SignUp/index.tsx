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

type NavigationProps = AuthProps<AuthRoutes.SignUp>;

const SignUp: React.FC<NavigationProps> = ({ navigation, route }) => {
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

  useEffect(() => {
    if (screenLoading && route.name === "SignUp")
      setTimeout(async () => {
        await dispatch(screenNotificationActions.updateScreenLoading(false));
        navigation?.replace(AuthRoutes.SignIn);
      }, 2000);
  }, [screenLoading]);

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
                  navigation?.navigate(AuthRoutes.DaDBSwiper);
                }}
              >
                <CancelIcon width={30} height={30} />
              </TouchableOpacity>
              <Text style={styles.r1t2}>Create Account</Text>
            </View>
            <View style={styles.r3}>
              <Text style={styles.r3t1}>Full Name</Text>
              <TextInput
                mode="outlined"
                // label={"Full Name"}
                placeholder={"Enter full name"}
                placeholderTextColor={COLORS.Light.greyText}
                textContentType="name"
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
              <Text style={styles.r3t1}>Choose a username</Text>
              <TextInput
                mode="outlined"
                // label={"Full Name"}
                placeholder={"e.g mark_kelvin"}
                placeholderTextColor={COLORS.Light.greyText}
                textContentType="username"
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
                value={username}
                onChangeText={(val) => {
                  setUsername(val);
                }}
              />
            </View>

            <View style={styles.r3}>
              <Text style={styles.r3t1}>Email Address</Text>
              <TextInput
                mode="outlined"
                // label={"Full Name"}
                placeholder={"Enter your email"}
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
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
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
              <Text style={styles.r9t1}>or sign up with</Text>
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
              <Text style={styles.r7t1}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate(AuthRoutes.SignIn);
                }}
              >
                <Text style={styles.r7t2}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

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
