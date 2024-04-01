import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/Colors";
import { MainProps, MainRoutes } from "../../../shared/const/routerMain";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { MainButton } from "../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { GeneralVerseOfTheDayType } from "../../../shared/types/slices";

type NavigationProps = MainProps<MainRoutes.VerseOfTheDay>;

const VerseOfTheDay: React.FC<NavigationProps> = ({ navigation, route }) => {
  const [currVOD, setCurrVod] = useState<GeneralVerseOfTheDayType>();
  const generalState = useSelector((state: RootState) => state.general);
  const { generalVerseOfTheDayList } = generalState;

  const { vodId } = route.params;

  useEffect(() => {
    setCurrVod(generalVerseOfTheDayList[vodId] || null);
  }, []);
  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerC1}>
              <View style={styles.r1}>
                <TouchableOpacity
                  style={styles.r1t1}
                  onPress={() => {
                    // navigation?.navigate(MainRoutes.HomeScreen);
                    navigation?.goBack();
                  }}
                >
                  <Ionicons
                    name="arrow-back-sharp"
                    size={24}
                    color={COLORS.Light.colorFour}
                  />
                </TouchableOpacity>
                <Text style={styles.r1t2}>Verse of the day</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <Text style={styles.r2}>
              <Text style={styles.r2t1}>
                {currVOD?.verse.split(":")[1].split(" ")[0]}{" "}
              </Text>
              <Text style={styles.r2t2}>{currVOD?.text}</Text>
            </Text>
            <TouchableOpacity style={styles.r3}>
              <Text style={styles.r3t}>{currVOD?.verse}</Text>
            </TouchableOpacity>
            <View style={styles.r8}>
              <MainButton
                title={"Go to devotional"}
                onPressFunction={() => {
                  // navigation?.navigate(AuthRoutes.SignUp);
                }}
                err={false}
                btnStyle={styles.r8t1}
                // disabled={!proceed}
              />
            </View>
          </ScrollView>
          <View style={styles.floatingContainer}>
            <TouchableOpacity style={styles.floatingContent1}>
              <Text style={styles.fc1t}>{currVOD?.verse}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.floatingContent2}>
              <Text style={styles.fc2t}>
                <FontAwesome5
                  name="play"
                  size={28}
                  color={COLORS.Light.background}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.floatingContent3}>
              <Text style={styles.fc3t}>
                <Entypo name="share" size={30} color={COLORS.Light.colorOne} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VerseOfTheDay;

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
    height: "14%",
    shadowColor: COLORS.Light.deeperGreyColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerC1: {
    justifyContent: "space-around",
  },
  r1: {
    flexDirection: "row",
    // justifyContent: "center",
    width: "100%",
    alignItems: "center",
    marginBottom: "4%",
    backgroundColor: "transparent",
  },
  r1t1: {},
  r1t2: {
    marginLeft: "8%",
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEight,
    fontWeight: "600",
    textAlign: "center",
  },
  bodyContainer: {
    // borderWidth: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.Light.background,
    paddingBottom: "30%",
    paddingHorizontal: "5%",
  },
  scroll: {
    // borderWidth: 1,
    width: "100%",
    backgroundColor: "transparent",
    paddingBottom: "10%",
    zIndex: 5,
  },
  scrollContent: {
    width: "100%",
    // height: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    // marginBottom: 50,
    paddingVertical: 5,
    paddingBottom: "10%",

    marginTop: "8%",
  },
  r8: {
    marginBottom: 10,
    backgroundColor: "transparent",
    paddingVertical: 5,
    width: "100%",
  },
  r8t1: {},
  r2: {
    width: "100%",
    flexDirection: "row",
    // borderWidth: 1,
    marginBottom: 10,
  },
  r2t1: {
    lineHeight: 28,
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    color: COLORS.Light.colorThirteen,
  },
  r2t2: {
    color: COLORS.Light.colorFourteen,
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    fontFamily: "Bitter",
    lineHeight: 28,
  },
  r3: {
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 50,
  },
  r3t: {
    color: COLORS.Light.deeperGreyColor,
    fontWeight: "500",
    fontSize: SIZES.sizeSix,
  },
  floatingContainer: {
    // borderWidth: 1,
    height: 50,
    width: "100%",
    position: "absolute",
    top: "90%",
    left: "5%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  floatingContent1: {
    height: 50,
    width: "100%",
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Light.colorTwentyOne,
    borderTopColor: COLORS.Light.hashHomeBackGround,
    borderTopWidth: 1,
    position: "absolute",
  },
  floatingContent2: {
    height: 68,
    width: 68,
    position: "absolute",
    top: "-148%",
    backgroundColor: COLORS.Light.colorOne,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.Light.colorOneLightA,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  floatingContent3: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: 70,
    width: 70,
    backgroundColor: COLORS.Light.colorNineteen,
    right: 8,
    top: -50,
    borderRadius: 40,
    shadowColor: COLORS.Light.deeperGreyColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  fc1t: {
    fontSize: SIZES.sizeSixC,
    fontWeight: "500",
  },
  fc2t: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginLeft: "8%",
  },
  fc3t: {},
});
