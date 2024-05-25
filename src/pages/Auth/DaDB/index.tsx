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
import { useDispatch } from "react-redux";
import { screenNotificationActions } from "@store/slices/notification";

type NavigationProps = AuthProps<AuthRoutes.DaDB>;

const DaBD: React.FC<NavigationProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" />
      <ImageBackground style={styles.container} source={IMAGES.splashScreen1}>
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
            <Image source={IMAGES.logoDailyAnswer} style={styles.r2t} />
          </View>
          <View style={styles.r3}>
            <Text style={styles.r3t}>The Daily Answer Devotional Bible</Text>
          </View>
          <View style={styles.r4}>
            <Text style={styles.r4t}>
              Welcome to The Daily Answer Devotion Bible. Start your day with
              devotion and seek God's presence.
            </Text>
          </View>
          <View style={styles.r5}>
            <View
              style={[styles.r5t, { backgroundColor: COLORS.Light.background }]}
            />
            <View style={styles.r5t} />
            <View style={styles.r5t} />
          </View>
        </View>
        <View style={styles.subContainer2}>
          <View style={styles.r6}>
            <MainButton
              title={"Get Started"}
              onPressFunction={() => {
                navigation?.navigate(AuthRoutes.DaSB);
                // dispatch(screenNotificationActions.updateScreenLoading(true));
              }}
              err={false}
              btnStyle={styles.r6t}
              // disabled={!proceed}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DaBD;

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
