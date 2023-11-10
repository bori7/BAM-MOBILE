import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { MoreProps, MoreRoutes } from "../../../shared/const/routerMore";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "../../../shared/const/routerRoot";
import { TextInput } from "react-native-paper";
import DropDownInput from "../../../components/DropDownInput";
import {
  CardAddSVG,
  MainProfileSVG,
  MdiBankSVG,
  MdiNairaSVG,
  MoreProfileSVG,
  RewardHeartSVG,
} from "../../../shared/components/SVGS";
import { MainButton } from "../../../components";
import { screenNotificationActions } from "../../../store/slices/notification";
import { MainRoutes } from "../../../shared/const/routerMain";
import { moreActions } from "../../../store/slices/more";
import ControlModal2 from "../../Devotional/ContentDevotional/ControlModal2";
import { OptionsPopUp } from "../../Main/Home/OptionsPopUp";
import CustomDatePicker from "../../Devotional/FilterDevotional/CustomDatePicker";
import { formatDate } from "../../../shared/helper";
import {
  GivingPaymentMethodType,
  NoteProps,
  PrayerProps,
} from "../../../shared/types/slices";
import { NotesRoutes } from "../../../shared/const/routerNotes";
import PrayerListView from "../Prayer/PrayerListView";
import CameraButton from "./CameraButton";
import SelectImageModal from "./SelectImageModal";
import FaceCapture from "./FaceCapture";

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.EditProfile>,
  RootScreenProps<RootRoutes.More>
>;

const EditProfile: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [amountF, setAmountF] = useState<string>("0.00");
  const [tabView, setTabView] = useState<"Notes" | "Prayers">("Notes");
  const [paymentMethod, setPaymentMethod] =
    useState<GivingPaymentMethodType>("C");
  // const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
  const [hideCurrency, setHideCurrency] = useState<boolean>(false);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState<number>(0);
  const [toDate, setToDate] = useState<string>(formatDate(new Date()));
  const [hideModal, setHideModal] = useState<boolean>(false);
  const [prayers, setPrayers] = useState<PrayerProps[]>([]);
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [imageData, setImageData] = useState<{
    uri: string;
    base64: string;
  } | null>(null);

  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [allowEmailError, setAllowEmailError] = useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = useState<string>("");

  const screenNotificationState = useSelector(
    (state: RootState) => state.screenNotification
  );
  const { screenLoading } = screenNotificationState;

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
              <Text style={styles.r1t2}>Edit profile</Text>
            </View>
            <TouchableOpacity
              style={[styles.v3c]}
              onPress={() => {
                // navigation?.navigate(MoreRoutes.EditProfile);
              }}
            >
              <Text style={[styles.v3ct]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <View style={styles.r7}>
              <View style={styles.r7a}>
                <MainProfileSVG
                  color={COLORS.Light.gray}
                  height={120}
                  width={120}
                />
                <CameraButton
                  onPressFunc={() => {
                    setShowModal(!showModal);
                  }}
                />
              </View>
              <SelectImageModal
                isModalVisible={showModal}
                setModalVisible={(): void => {
                  setShowModal(!showModal);
                }}
                onSave={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              {/* <View style={styles.r7b}></View>
              <Text style={styles.r7c}></Text>
              <Text style={styles.r7d}></Text>
              <Text style={styles.r7e}></Text>
              <Text style={styles.r7f}></Text>
              <View style={styles.r7g}></View> */}
              {/* <FaceCapture
                style={styles.facecapture}
                setImageData={setImageData}
              /> */}

              <View style={styles.r3}>
                <Text style={styles.r3t1}>Full name</Text>
                <TextInput
                  mode="outlined"
                  // label={"Full Name"}
                  placeholder={"Enter fullname"}
                  placeholderTextColor={COLORS.Light.greyText}
                  textContentType="givenName"
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
                <Text style={styles.r3t1}>Username</Text>
                <TextInput
                  mode="outlined"
                  // label={"Full Name"}
                  placeholder={"Enter username"}
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
                <Text style={styles.r3t1}>Bio</Text>
                <TextInput
                  mode="outlined"
                  // label={"Full Name"}
                  placeholder={"Add your bio"}
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
                  multiline
                  value={bio}
                  onChangeText={(val) => {
                    setBio(val);
                  }}
                />
              </View>
              <View style={styles.r3}>
                <Text style={styles.r3t1}>Location</Text>
                <TextInput
                  mode="outlined"
                  // label={"Full Name"}
                  placeholder={"Add your location"}
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
                  value={location}
                  onChangeText={(val) => {
                    setLocation(val);
                  }}
                />
              </View>
            </View>
            <View style={styles.r8}></View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

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
  v1rbt2: {
    marginRight: 10,
    // borderWidth: 1,
  },
  r7: {
    // flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    // backgroundColor: COLORS.Light.colorTwentyOne,
    paddingHorizontal: "4%",
    paddingTop: "4%",
  },
  r7a: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "15%",
    marginBottom: "10%",
    // borderWidth: 1,
  },
  r7b: {
    height: 120,
    width: 120,
    marginTop: 15,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  r7c: {
    marginTop: 10,
    fontSize: SIZES.sizeEightA,
    fontWeight: "600",
    color: COLORS.Light.colorFour,
    // lineHeight: 26,
  },
  r7d: {
    marginVertical: 3,
    fontSize: SIZES.sizeEight,
    fontWeight: "400",
    color: COLORS.Light.deeperGreyColor,
    // lineHeight: 26,
  },
  r7e: {
    marginVertical: 3,
    fontSize: SIZES.sizeSixB,
    fontWeight: "500",
    color: COLORS.Light.colorFour,
    // lineHeight: 26,
  },
  r7f: {
    marginVertical: 3,
    fontSize: SIZES.sizeSixB,
    fontWeight: "500",
    color: COLORS.Light.colorFour,
    // lineHeight: 26,
  },
  r7g: {
    marginTop: 50,
    flexDirection: "row",
    width: "108%",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  r7g1: {
    borderWidth: 1,
    width: "50%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  r7g2: {
    borderBottomWidth: 4,
    width: "50%",
    backgroundColor: "transparent",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomColor: COLORS.Light.colorOne,
  },
  r7gt: {
    fontSize: SIZES.sizeEight,
    fontWeight: "600",
    color: COLORS.Light.colorFour,
  },
  r8: {
    marginTop: 20,
  },
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
  r3a: {
    marginVertical: 45,
  },
  // r3t1: {
  //   fontSize: SIZES.sizeSixB,
  //   fontWeight: "400",
  //   color: COLORS.Light.deeperGreyColor,
  //   textAlign: "center",
  // },
  // r3: {
  //   width: "100%",
  //   paddingVertical: 20,
  //   paddingHorizontal: 20,
  //   borderRadius: 15,
  //   backgroundColor: COLORS.Light.hashBackGroundL2,
  //   marginBottom: 30,
  // },
  // r3t1: {
  //   color: COLORS.Light.colorFour,
  //   fontSize: SIZES.sizeEight,
  //   fontWeight: "500",
  //   marginVertical: 10,
  // },
  r3t2: {
    color: COLORS.Light.gray,
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    marginVertical: 8,
  },
  r3t3: {
    color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    marginVertical: 8,
  },
  r4: {
    marginTop: 15,
    writingDirection: "rtl",
    width: "84%",
  },
  r4btn: {
    height: 65,
  },
  r5Container: {
    width: "100%",
    marginVertical: 20,
  },
  r5: {
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.Light.hashHomeBackGround,
    borderRadius: 15,
    padding: 15,
  },
  r5c1: {
    borderRadius: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  r5c1a: {
    marginRight: 10,
    backgroundColor: COLORS.Light.colorOneLight,
    padding: 15,
    borderRadius: 30,
  },
  r5c1b: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  r5c1bt1: {
    marginBottom: 10,
    fontWeight: "500",
    fontSize: SIZES.sizeEight,
  },
  r5c1bt2: {
    fontWeight: "400",
    fontSize: SIZES.sizeSix,
    color: COLORS.Light.deeperGreyColor,
  },
  r5c2: {
    // justifyContent: "space-between",
    fontSize: SIZES.sizeSixB,
    // color: COLORS.Light.deeperGreyColor,
    fontWeight: "600",
  },
  r5c2t1: {
    fontWeight: "500",
    fontSize: SIZES.sizeSixB,
    marginBottom: 5,
  },
  r5c2t2: {
    fontWeight: "400",
    fontSize: SIZES.sizeSix,
    color: COLORS.Light.deeperGreyColor,
    // marginTop: 5,
  },

  r6: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.Light.colorThirteenB,
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
  },
  r6t: {
    color: COLORS.Light.colorThirteen,
    fontWeight: "600",
    fontSize: SIZES.sizeSixC,
  },
  xstyle: {
    width: 220,
    // height: 150,
    top: 110,
    right: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bstyle: {
    // paddingVertical: "10%",
    paddingHorizontal: "8%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    borderColor: COLORS.Light.hashBackGround,
    borderWidth: 2,
  },
  optionBody: {
    padding: "5%",
    marginVertical: "5%",
  },
  optionText: {
    fontSize: SIZES.sizeSeven,
    // fontWeight: "600",
  },
  v3c: {
    // backgroundColor: COLORS.Light.colorOneLight,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    marginRight: 10,
    alignSelf: "flex-end",
  },

  v3ct: {
    color: COLORS.Light.colorOne,
    fontWeight: "600",
    fontSize: SIZES.sizeSeven,
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
  facecapture: {
    marginVertical: 5,
    height: "75%",
    width: "90%",
    padding: 5,
    // borderWidth: 1,
    // borderColor: COLORS.Light.colorSixteen,
    justifyContent: "space-between",
  },
});
