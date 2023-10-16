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
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import UserIcon from "../../../shared/assets/images/svg/solar_user_icon.svg";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import MidDoubleTick from "../../../shared/assets/images/svg/mdi_check_all.svg";
import SolidPray from "../../../shared/assets/images/svg/fa_solid_pray.svg";
import { OptionsPopUp } from "./OptionsPopUp";
import { MainProps, MainRoutes } from "../../../shared/const/routerMain";

type NavigationProps = MainProps<MainRoutes.HomeScreen>;

const Home: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [hideOptions, setHideOptions] = useState<boolean>(false);

  const options = [{ name: "Share" }, { name: "Copy" }];

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerC1}>
              <Text style={styles.headerC1t1}>Good Morning 👋</Text>
              <Text style={styles.headerC1t2}>Friday September 22, 2023</Text>
            </View>
            <TouchableOpacity style={styles.headerC2}>
              <UserIcon width={35} height={35} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <View style={styles.v1}>
              <Text style={styles.v1t1}>Verse of the Day</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate(MainRoutes.VerseOfTheDay);
                }}
              >
                <Text style={styles.v1t2}>
                  Blessed are they which do hunger and thirst after
                  righteousness: for they shall be filled.
                </Text>
              </TouchableOpacity>
              <View style={styles.v1r}>
                <Text style={styles.v1rt1}>Matthew 5:6 KJV</Text>
                <View style={styles.v1rb}>
                  <TouchableOpacity style={styles.v1rbt1}>
                    <Entypo name="share" size={24} color={COLORS.Light.gray} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.v1rbt2}
                    onPress={() => {
                      setHideOptions(!hideOptions);
                    }}
                  >
                    <SimpleLineIcons
                      name="options-vertical"
                      size={24}
                      color={COLORS.Light.gray}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {hideOptions && (
                <OptionsPopUp
                  bstyle={styles.bstyle}
                  xstyle={styles.xstyle}
                  children={
                    <>
                      {options.map((option, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.optionBody}
                          onPress={() => {
                            setHideOptions(!hideOptions);
                          }}
                        >
                          <Text style={styles.optionText}>{option.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  }
                />
              )}
            </View>
            <Text style={styles.ft1}>Today’s Devotional</Text>
            <View style={styles.v2}>
              <TouchableOpacity style={styles.v2r1}>
                <Image
                  source={IMAGES.devotionalSample1}
                  style={styles.v2r1Image}
                  borderTopLeftRadius={25}
                  borderTopRightRadius={25}
                />
              </TouchableOpacity>
              <View style={styles.v2r2}>
                <View style={styles.v2r2a}>
                  <View style={styles.v2r2aC1}>
                    <Text style={styles.v2r2t1}>September 22, 2023</Text>
                    <Text style={styles.v2r2t2}>SHARING YOUR FAITH</Text>
                  </View>
                  <TouchableOpacity style={styles.v2r2aC2}>
                    <MidDoubleTick
                      fill={COLORS.Light.colorThirteen}
                      // stroke={COLORS.Light.colorThirteen}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.v2r2t}>
                  The Apostles went everywhere to share their faith in Christ.
                  They did not go to hide themselves for fear of suffering or
                  persecution. They utilized every opport...
                </Text>
              </View>
            </View>
            <View style={styles.v3}>
              <View style={styles.v3a}>
                <Text style={styles.v3at1}>Personal Prayers</Text>
                <TouchableOpacity style={styles.v3at2}>
                  <SolidPray width={30} height={30} />
                </TouchableOpacity>
              </View>
              <Text style={styles.v3b}>
                Pray without ceasing. God wants to hear from you
              </Text>
              <TouchableOpacity style={styles.v3c}>
                <Text style={styles.v3ct}>Pray Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: COLORS.Light.hashHomeBackGround,
  },
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // marginHorizontal: "5%",
    backgroundColor: COLORS.Light.hashHomeBackGround,
  },
  headerContainer: {
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: 10,
    paddingHorizontal: "8%",
    backgroundColor: COLORS.Light.background,
    height: "16%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerC1: {
    justifyContent: "space-around",
  },
  headerC1t1: {
    fontSize: SIZES.sizeSeven,
    fontWeight: "500",
    marginBottom: 6,
  },
  headerC1t2: {
    fontSize: SIZES.sizeFiveC,
    fontWeight: "400",
    color: COLORS.Light.deeperGreyColor,
  },
  headerC2: {
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    // borderWidth: 1,
    width: "90%",
    height: "100%",
    backgroundColor: COLORS.Light.hashHomeBackGround,
    paddingBottom: "30%",
  },
  scroll: {
    // borderWidth: 1,
    width: "100%",
    marginTop: 10,
    backgroundColor: "transparent",
    paddingBottom: "10%",
  },
  scrollContent: {
    width: "100%",
    // height: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    // marginBottom: 50,
    paddingVertical: 5,
    paddingBottom: "10%",
  },
  v1: {
    backgroundColor: COLORS.Light.background,
    width: "100%",
    padding: 15,
    borderRadius: 20,
    shadowColor: COLORS.Light.colorTwentyFour,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 5,
  },
  v1t1: {
    fontSize: SIZES.sizeSixB,
    fontWeight: "600",
    marginBottom: 20,
  },
  v1t2: {
    fontSize: SIZES.sizeSevenB,
    fontWeight: "400",
    marginBottom: 20,
    fontFamily: "Bitter",
    lineHeight: 24,
  },
  v1r: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  v1rt1: {
    color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSixB,
  },
  v1rb: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: "20%",
  },
  v1rbt1: {},
  v1rbt2: {},
  v2: {
    width: "100%",
    backgroundColor: COLORS.Light.background,
    borderRadius: 25,
    shadowColor: COLORS.Light.colorTwentyFour,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    // zIndex: -1,
  },
  v2r1: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  v2r1Image: {
    height: 200,
    resizeMode: "cover",
    // borderWidth: 1,
    width: "100%",
  },
  v2r2: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 25,
  },
  v2r2a: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  v2r2aC1: {
    justifyContent: "space-between",
    // alignItems: "center",
  },
  v2r2aC2: {
    alignItems: "center",
    justifyContent: "center",
  },

  v2r2t1: {
    color: COLORS.Light.deepGreyColor,
    fontSize: SIZES.sizeSixB,
    fontWeight: "400",
    marginBottom: 5,
  },
  v2r2t2: {
    fontSize: SIZES.sizeSixC,
    fontWeight: "500",
    // marginTop: 5,
  },
  v2r2t: {
    // color: COLORS.Light.deepGreyColor,
    fontSize: SIZES.sizeSix,
    fontWeight: "400",
    marginBottom: 10,
    lineHeight: 24,
  },
  v3: {
    width: "100%",
    backgroundColor: COLORS.Light.background,
    borderRadius: 25,
    shadowColor: COLORS.Light.colorTwentyFour,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginVertical: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  v3a: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  v3at1: {
    fontSize: SIZES.sizeSeven,
    fontWeight: "600",
    // marginBottom: 20,
  },
  v3at2: {
    alignItems: "center",
    justifyContent: "center",
  },
  v3b: {
    fontSize: SIZES.sizeSixC,
    fontWeight: "400",
    marginVertical: 20,
  },
  v3c: {
    backgroundColor: COLORS.Light.colorOneLight,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
    borderRadius: 20,
  },

  v3ct: {
    color: COLORS.Light.colorOne,
    fontWeight: "600",
    fontSize: SIZES.sizeSixC,
  },

  ft1: {
    alignSelf: "flex-start",
    marginVertical: 20,
    color: COLORS.Light.colorThirteen,
    fontSize: SIZES.sizeSeven,
    fontWeight: "600",
  },
  xstyle: {
    width: 150,
    height: 150,
    borderWidth: 2,
    top: 180,
    right: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: COLORS.Light.hashBackGround,
  },
  bstyle: {
    padding: "15%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  optionBody: {
    padding: "10%",
    marginVertical: "5%",
  },
  optionText: {
    fontSize: SIZES.sizeSeven,
    // fontWeight: "600",
  },
});
