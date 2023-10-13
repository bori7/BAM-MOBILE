import { Image, StatusBar, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";
import Swiper from "react-native-swiper";
import { Text, View } from "../../../components/Themed";
import { AuthProps, AuthRoutes } from "../../../shared/const/routerAuth";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { AntDesign, Octicons } from "@expo/vector-icons";

type NavigationProps = AuthProps<AuthRoutes.DaDB>;

const DaBDSwiper = () => {
  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={true}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Slide 1</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Slide 2</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>Slide 3</Text>
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default DaBDSwiper;

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    width: "100%",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },

  // Style for the active (current) dot
  activeDot: {
    backgroundColor: "white",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});
