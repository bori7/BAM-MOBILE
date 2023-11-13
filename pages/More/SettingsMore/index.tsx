import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/Colors";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import {
  CommonActions,
  CompositeScreenProps,
  useFocusEffect,
} from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "../../../shared/const/routerRoot";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { MoreProps, MoreRoutes } from "../../../shared/const/routerMore";
import { AuthRoutes } from "../../../shared/const/routerAuth";

// type NavigationProps = NotesProps<NotesRoutes.NotesSearch>;

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.Settings>,
  RootScreenProps<RootRoutes.More>
>;

const SettingsMore: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [hideStatusBar, setHideStatusBar] = useState<boolean>(false);

  useEffect(() => {}, []);

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: RootRoutes.Auth,
        params: {
          screen: AuthRoutes.SignIn,
        },
      },
    ],
  });

  return (
    <View style={[styles.main]}>
      <StatusBar barStyle="dark-content" hidden={hideStatusBar} />
      <View style={[styles.container]}>
        <View
          style={[
            styles.headerContainer,
            { marginTop: hideStatusBar ? "7%" : 0 },
            !hideStatusBar && styles.headerShadow,
          ]}
        >
          <View style={styles.headerR}>
            <TouchableOpacity
              style={styles.headerRC1}
              onPress={() => {
                navigation?.goBack();
              }}
            >
              <Ionicons
                name="arrow-back-sharp"
                size={30}
                color={COLORS.Light.colorFour}
              />
            </TouchableOpacity>

            <View style={styles.headerRC2}>
              <View style={styles.headerRC2c1}>
                <Text style={styles.r1t2}>Settings</Text>
              </View>

              <TouchableOpacity
                style={styles.v3c}
                onPress={() => {
                  navigation?.dispatch(resetAction);
                }}
              >
                <Text style={styles.v3ct}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <Text style={styles.timeText}>ACCOUNT</Text>
            <View style={styles.innerTimeTexts}>
              <TouchableOpacity
                style={styles.innerTimeTextC}
                onPress={() => {
                  navigation?.navigate(MoreRoutes.EditProfile);
                }}
              >
                <Text style={styles.innerTimeText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.innerTimeTextC}
                onPress={() => {
                  navigation?.navigate(MoreRoutes.ChangePassword);
                }}
              >
                <Text style={styles.innerTimeText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.innerTimeTextC}
                onPress={() => {
                  navigation?.navigate(MoreRoutes.Notifications);
                }}
              >
                <Text style={styles.innerTimeText}>Notifications</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.timeText}>PREFERNCES</Text>
            <View style={styles.innerTimeTexts}>
              <TouchableOpacity style={styles.innerTimeTextC}>
                <Text style={styles.innerTimeText}>Dark Mode</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.innerTimeTextC}>
                <Text style={styles.innerTimeText}>Font Size</Text>
              </TouchableOpacity> */}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default SettingsMore;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: COLORS.Light.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // marginHorizontal: "5%",
    backgroundColor: COLORS.Light.background,
    // borderWidth: 1,
  },
  headerContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    // paddingBottom: 10,
    paddingHorizontal: "8%",
    backgroundColor: COLORS.Light.background,
    height: "14%",
  },
  headerShadow: {
    shadowColor: COLORS.Light.deeperGreyColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 10,
    // borderWidth: 1,
  },
  headerR: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    // borderWidth: 1,
    // marginTop: 20,
  },
  headerRC1: {
    marginRight: "2%",
  },
  headerRC2: {
    // width: "95%",
    paddingHorizontal: 15,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "space-around",
    // justifyContent: "center",
    // borderRadius: 40,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  headerRC2c1: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    // justifyContent: "center",
    width: "100%",
  },
  headerRC2t1: {
    // marginRight: "3%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRC2t2: {
    width: "100%",
    backgroundColor: "transparent",
    // borderWidth: 1,
    height: "250%",
    alignItems: "center",
  },
  headerRC2t2Title: {
    width: "100%",
    backgroundColor: "transparent",
    // borderWidth: 1,
    // height: "250%",
    alignItems: "center",
  },
  inputContent: {
    color: COLORS.Light.colorFour,
    width: "100%",
    backgroundColor: "transparent",
    // fontSize: SIZES.sizeEight,
    fontWeight: "400",
    // borderWidth: 1,
    // alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    fontSize: SIZES.sizeEight,
    lineHeight: 24,
  },
  inputContentTitle: {
    fontSize: SIZES.sizeNine,
    fontWeight: "600",
    marginVertical: "1%",
    color: COLORS.Light.colorFour,
    width: "100%",
    backgroundColor: "transparent",
  },
  headerRC2t3: {
    // marginRight: "5%",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "flex-start",
    backgroundColor: "transparent",
    // marginBottom: 50,
    paddingVertical: 5,
    paddingBottom: "10%",

    marginTop: "8%",
  },
  r1t2: {
    marginLeft: "8%",
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightA,
    fontWeight: "600",
    textAlign: "center",
  },
  v1rbt1: {},
  v1rbt2: {},
  v1rb: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: "20%",
  },
  bstyle: {
    padding: "15%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    borderWidth: 2,
    borderColor: COLORS.Light.hashBackGround,
  },
  optionBody: {
    padding: "10%",
    marginVertical: "5%",
  },
  optionText: {
    fontSize: SIZES.sizeSeven,
    // fontWeight: "600",
  },
  xstyle: {
    width: 220,
    height: 250,
    // borderWidth: 2,
    top: 50,
    right: -50,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    // borderColor: COLORS.Light.hashBackGround,

    zIndex: 10,
    // borderWidt
  },
  dt: {
    color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSixC,
    fontWeight: "400",
    textAlign: "center",
    marginVertical: "3%",
  },
  titleContainer: {
    // padding: 20,
    // backgroundColor: COLORS.Light.hashBackGroundL2,
    width: "100%",
    // borderRadius: 15,
  },
  title: {
    // color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSevenB,
    fontWeight: "600",
    // marginVertical: "4%",
  },
  titleRef: {
    fontSize: SIZES.sizeSix,
    fontWeight: "500",
    marginVertical: "2%",
    color: COLORS.Light.gray,
    fontStyle: "italic",
  },
  textContent: {
    marginVertical: 25,
    fontSize: SIZES.sizeSixC,
    fontWeight: "400",
  },
  v3c: {
    backgroundColor: COLORS.Light.colorOneLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    marginRight: 10,
  },

  v3ct: {
    color: COLORS.Light.colorOne,
    fontWeight: "500",
    fontSize: SIZES.sizeSeven,
  },
  timeText: {
    marginLeft: "4%",
    marginBottom: "5%",
    color: COLORS.Light.deepGreyColor,
    fontWeight: "500",
    fontSize: SIZES.sizeSixC,
  },
  innerTimeTexts: {
    marginLeft: "10%",
    marginBottom: 20,
  },
  innerTimeText: {
    fontWeight: "400",
    fontSize: SIZES.sizeSeven,
  },
  innerTimeTextC: {
    marginBottom: 30,
    marginTop: 10,
  },
});
