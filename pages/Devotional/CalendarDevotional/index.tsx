import {
  Image,
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
import { Ionicons } from "@expo/vector-icons";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { DevotionalItemProps } from "../../../shared/types/slices";
import {
  DevotionalProps,
  DevotionalRoutes,
} from "../../../shared/const/routerDevotional";
import CalendarView from "./CalendarView";

type NavigationProps = DevotionalProps<DevotionalRoutes.CalendarDevotional>;

const CalendarDevotional: React.FC<NavigationProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [hideOptions, setHideOptions] = useState<boolean>(false);
  const [devotionals, setDevotionals] = useState<DevotionalItemProps[]>([]);
  const [displayFilter, setDisplayFilter] = useState<boolean>(false);

  const toggleFilterModal = () => {
    setDisplayFilter(!displayFilter);
  };

  const devotionalState = useSelector((state: RootState) => state.devotional);
  const { devotionalData } = devotionalState;

  const options = [
    { name: "Devotional Info" },
    { name: "Calendar" },
    { name: "Settings" },
  ];

  const onClickOption = (type: string) => {
    switch (type) {
      case "Devotional Info":
        navigation.navigate(DevotionalRoutes.AboutDevotional);
      case "Pray":
        break;
      case "Save":
      case "Edit":
        break;
      case "Delete":
        navigation?.goBack();
        break;
      default:
        break;
    }
  };

  useFocusEffect(() => {
    setDevotionals(devotionalData?.devotionalList || []);
  });

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={[styles.headerContainer, styles.headerShadow]}>
          <View style={styles.header}>
            <View style={styles.headerC1}>
              <TouchableOpacity
                // style={styles.r2t}
                onPress={() => {
                  navigation?.goBack();
                }}
              >
                <Ionicons
                  name="arrow-back-sharp"
                  size={28}
                  color={COLORS.Light.colorFour}
                />
              </TouchableOpacity>
              <Text style={styles.r1t2}>Calendar</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <Text style={styles.fv2}>
              Lorem ipsum dolor sit amet consectetur. Et ridiculus morbi
              consequat pulvinar ut dui arcu. At arcu volutpat orci urna enim
              sed quis.
            </Text>

            {/* <Text style={styles.fv1}>DAILY ANSWER DEVOTIONAL</Text> */}

            {/* <Text style={styles.fv3}>January</Text> */}
            <View style={styles.fv4}>
              <CalendarView />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CalendarDevotional;

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
  },
  headerContainer: {
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: 10,
    paddingHorizontal: "3%",
    backgroundColor: COLORS.Light.background,
    height: "13%",
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerC1: {
    // borderWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  headerC1t1: {
    fontSize: SIZES.sizeNineB,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
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
  r1t2: {
    marginLeft: "8%",
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightB,
    fontWeight: "600",
    textAlign: "center",
  },
  bodyContainer: {
    // borderWidth: 1,
    width: "90%",
    height: "100%",
    backgroundColor: COLORS.Light.background,
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

  r2t: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    width: 120,
    marginVertical: 10,
    // borderWidth: 1,
  },

  fv1: {
    marginVertical: 20,
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightB,
    fontWeight: "600",
  },
  fv2: {
    marginVertical: 30,
    lineHeight: 22,
  },
  fv3: {
    marginTop: 10,
    alignSelf: "flex-start",
    fontWeight: "400",
    fontSize: SIZES.sizeSixC,
    color: COLORS.Light.deepGreyColor,
  },
  fv4: {
    marginVertical: 10,
    // lineHeight: 22,
    width: "100%",
  },
});
