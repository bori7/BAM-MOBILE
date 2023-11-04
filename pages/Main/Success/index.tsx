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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { SuccessSVG } from "../../../shared/components/SVGS";
import { MainProps, MainRoutes } from "../../../shared/const/routerMain";

type NavigationProps = MainProps<MainRoutes.Success>;

const Success: React.FC<NavigationProps> = ({ navigation, route }) => {
  const {
    mainText,
    subText,
    btnText,
    toScreen,
    toSubScreen,
    toSubScreenParams,
  } = route.params;
  const dispatch = useDispatch<AppDispatch>();
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
            <View style={styles.r3}>
              <SuccessSVG />
            </View>

            <View style={styles.r2}>
              <Text style={styles.r2t1}>{mainText}</Text>
              <Text style={styles.r2t2}>{subText}</Text>
            </View>

            <View style={styles.r4}>
              <MainButton
                title={btnText}
                onPressFunction={() => {
                  navigation?.pop();
                  navigation?.navigate(toScreen, {
                    screen: toSubScreen,
                  });
                }}
                err={false}
                btnStyle={styles.r4btn}
                // disabled={!proceed}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // borderWidth: 1,
  },
  container: {
    // borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    width: "70%",
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
    marginTop: 10,
    marginBottom: 40,
    textAlign: "center",
    color: COLORS.Light.gray,
    fontSize: SIZES.sizeSixC,
  },
  r3: {
    // width: "100%",
    marginVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
    // borderWidth: 1,
    backgroundColor: COLORS.Light.colorFifteen,
    padding: 10,
  },

  r3t1: {
    marginBottom: 18,
    fontWeight: "300",
    fontSize: SIZES.sizeSeven,
  },

  r4: {
    marginVertical: 50,
    writingDirection: "rtl",
    width: "100%",
  },
  r4btn: {},
});
