import { Image, StatusBar, StyleSheet, TouchableOpacity } from "react-native";

import React, { useRef } from "react";
import Swiper from "react-native-swiper";
import { Text, View } from "../../../components/Themed";
import { AuthProps, AuthRoutes } from "../../../shared/const/routerAuth";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import DADB1 from "./DADB1";
import DASB1 from "./DASB1";
import GFA1 from "./GFA1";

type NavigationProps = AuthProps<AuthRoutes.DaDBSwiper>;

const DaDBSwiper: React.FC<NavigationProps> = ({ navigation }) => {
  const swiperRef = useRef<any>(null);

  const goToNextSwipe = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };

  const handleGetStarted = () => {
    goToNextSwipe();
  };

  const handleContinue = () => {
    goToNextSwipe();
  };

  const handleSignUp = () => {
    navigation?.navigate(AuthRoutes.SignUp);
  };

  const handleSignIn = () => {
    navigation?.navigate(AuthRoutes.SignIn);
  };

  const handleSkip = () => {
    navigation?.navigate(AuthRoutes.SignUp);
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          loop={false}
          index={0}
          ref={swiperRef}
          // showsButtons={true}
          // showsPagination={true}
          // bounces={true}
        >
          <View style={styles.slide1}>
            <DADB1
              onSkip={() => {
                handleSkip();
              }}
              onGetStarted={() => {
                handleGetStarted();
              }}
            />
          </View>
          <View style={styles.slide2}>
            <DASB1
              onSkip={() => {
                handleSkip();
              }}
              onContinue={() => {
                handleContinue();
              }}
            />
          </View>
          <View style={styles.slide3}>
            <GFA1
              onSkip={() => {
                handleSkip();
              }}
              onSignUp={() => {
                handleSignUp();
              }}
              onSignIn={() => {
                handleSignIn();
              }}
            />
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default DaDBSwiper;

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.Light.colorEight,
    flex: 1,
  },
  container: {
    // borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 25,
    backgroundColor: COLORS.Light.colorEight,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
  },
  slide2: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "transparent",
  },
  slide3: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  dot: {
    backgroundColor: COLORS.Light.colorFive,
    // width: 8,
    // height: 8,
    // borderRadius: 4,
    // margin: 3,

    height: 15,
    width: 15,
    marginHorizontal: 20,
    borderRadius: 10,

    // position: "absolute",
    // top: "-1000%",
  },

  // Style for the active (current) dot
  activeDot: {
    backgroundColor: COLORS.Light.background,

    // width: 8,
    // height: 8,
    // borderRadius: 4,
    // margin: 3,
    // borderWidth: 10,

    height: 15,
    width: 15,
    marginHorizontal: 15,
    borderRadius: 10,

    // position: "absolute",
  },
});
