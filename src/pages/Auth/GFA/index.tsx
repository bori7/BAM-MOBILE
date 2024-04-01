import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React from "react";
import { Text, View } from "@components/Themed";
import { AuthProps, AuthRoutes } from "@shared/const/routerAuth";
import { COLORS, IMAGES, SIZES } from "@constants/Colors";
import { MainButton } from "../../../components";
import GFALogo from "@shared/assets/images/svg/gfa.svg";

type NavigationProps = AuthProps<AuthRoutes.GFA>;

const GFA: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" />
      <ImageBackground style={styles.container} source={IMAGES.splashScreen3}>
        <View style={styles.subContainer}>
          <View style={styles.r1}>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate(AuthRoutes.SignUp);
              }}
            >
              <Text style={styles.r1t}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.r2}>
            <GFALogo width={100} height={100} />
          </View>
          <View style={styles.r3}>
            <Text style={styles.r3t}>Grace for All</Text>
          </View>
          <View style={styles.r4}>
            <Text style={styles.r4t}>
              A Devotional App for Everyone. Connecting People of All
              Backgrounds to God's Love.
            </Text>
          </View>
          <View style={styles.r5}>
            <View style={styles.r5t} />
            <View style={styles.r5t} />
            <View
              style={[styles.r5t, { backgroundColor: COLORS.Light.background }]}
            />
          </View>
        </View>
        <View style={styles.subContainer2}>
          <View style={styles.r6}>
            <MainButton
              title={"Sign Up"}
              onPressFunction={() => {
                navigation?.navigate(AuthRoutes.SignUp);
              }}
              err={false}
              btnStyle={styles.r6t}
              // disabled={!proceed}
            />
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
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default GFA;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.Light.colorEight,
    flex: 1,
    // borderWidth: 1,
  },
  container: {
    // borderWidth: 1,
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: COLORS.Light.colorEight,
  },
  subContainer: {
    // flex: 1,
    // borderWidth: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: "60%",
    width: "100%",
    marginTop: "15%",
  },
  subContainer2: {
    // flex: 1,

    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: "20%",
    width: "100%",
    marginVertical: 50,
  },
  r1: {
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    width: "100%",
    marginRight: 40,
    // marginTop: "1%",
    // marginBottom: "1%",
  },
  r2: {
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: "35%",
    marginBottom: "1%",
  },
  r3: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
  },
  r4: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 20,
  },
  r5: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    marginVertical: "3%",
    flexDirection: "row",
    marginBottom: "30%",
  },
  r6: {
    marginBottom: 10,
    marginTop: "5%",
    backgroundColor: "transparent",
    paddingVertical: 5,
    width: "80%",

    // borderWidth: 1,
    // borderColor: "white",
  },
  r1t: {
    color: COLORS.Light.colorEight,
    fontSize: SIZES.sizeSevenB,
    fontWeight: "500",
  },
  r2t: {
    width: 100,
    height: 100,
  },
  r3t: {
    color: COLORS.Light.colorEight,
    fontSize: SIZES.sizeEleven,
    fontWeight: "700",
    textAlign: "center",
  },
  r4t: {
    color: COLORS.Light.background,
    fontSize: SIZES.sizeEight,
    fontWeight: "500",
    textAlign: "center",
  },
  r5t: {
    backgroundColor: COLORS.Light.colorFive,
    height: 15,
    width: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    // color: COLORS.Light.colorThirteen,
  },
  r6t: {
    width: "100%",
  },
  r7: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    marginTop: "7%",
    alignItems: "center",
    justifyContent: "center",
  },
  r7t1: {
    color: COLORS.Light.background,
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
  // text: {
  //   color: "#fff",
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   backgroundColor: "transparent",
  // },
  // dot: {
  //   backgroundColor: "rgba(255, 255, 255, 0.3)",
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   margin: 3,
  // },

  // // Style for the active (current) dot
  // activeDot: {
  //   backgroundColor: "white",
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   margin: 3,
  // },
});
