import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/Colors";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { NotesProps, NotesRoutes } from "../../../shared/const/routerNotes";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "../../../shared/const/routerRoot";
import { NoteProps, PrayerProps } from "../../../shared/types/slices";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { OptionsPopUp } from "../../Main/Home/OptionsPopUp";
import { TextInput } from "react-native-paper";
import { notesActions } from "../../../store/slices/notes";
import { MoreProps, MoreRoutes } from "../../../shared/const/routerMore";
import PrayerListView from "./PrayerListView";
import AnsweredList from "./AnsweredList";

// type NavigationProps = NotesProps<NotesRoutes.NotesSearch>;

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.Prayer>,
  RootScreenProps<RootRoutes.More>
>;

const Prayer: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [prayers, setPrayers] = useState<PrayerProps[]>([]);
  const [ansPrayers, setAnsPrayers] = useState<PrayerProps[]>([]);
  const [tabView, setTabView] = useState<"PrayerList" | "Answered">(
    "PrayerList"
  );
  const [fetchedNote, setFetchedNote] = useState<NoteProps>();
  const [hideOptions, setHideOptions] = useState<boolean>(false);
  const [allowEdit, setAllowEdit] = useState<boolean>(false);

  const prayersState = useSelector((state: RootState) => state.prayer);
  const { prayersData } = prayersState;

  const options = [
    { name: "Copy" },
    { name: "Pray" },
    { name: allowEdit ? "Save" : "Edit" },
    { name: "Delete" },
  ];

  useEffect(() => {
    setPrayers(prayersData?.prayersList?.filter((p, _) => !p.answered) || []);
    setAnsPrayers(prayersData?.prayersList?.filter((p, _) => p.answered) || []);
  }, [prayersData]);

  return (
    <View style={[styles.main]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={[styles.headerContainer, styles.headerShadow]}>
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
                <Text style={styles.r1t2}>Prayer</Text>
              </View>
            </View>
            {hideOptions && (
              <OptionsPopUp
                xstyle={styles.xstyle}
                bstyle={styles.bstyle}
                children={
                  <>
                    {options.map((option, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.optionBody}
                        onPress={() => {
                          // onClickOption(option.name);
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
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            <View style={styles.r1}>
              <TouchableOpacity
                style={[
                  styles.v3c,
                  tabView === "PrayerList" && {
                    backgroundColor: COLORS.Light.colorOne,
                  },
                ]}
                onPress={() => {
                  setTabView("PrayerList");
                }}
              >
                <Text
                  style={[
                    styles.v3ct,
                    tabView === "PrayerList" && {
                      color: COLORS.Light.background,
                    },
                  ]}
                >
                  Prayer List
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.v3c,
                  tabView === "Answered" && {
                    backgroundColor: COLORS.Light.colorOne,
                  },
                ]}
                onPress={() => {
                  setTabView("Answered");
                }}
              >
                <Text
                  style={[
                    styles.v3ct,
                    tabView === "Answered" && {
                      color: COLORS.Light.background,
                    },
                  ]}
                >
                  Answered
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.v2}>
              {tabView === "Answered" && (
                <AnsweredList
                  prayers={ansPrayers}
                  onPressPrayerFunc={(uid) => {
                    navigation.navigate(RootRoutes.More, {
                      screen: MoreRoutes.PrayerEdit,
                      params: {
                        prayerId: uid,
                      },
                    });
                  }}
                />
              )}
              {tabView === "PrayerList" && (
                <PrayerListView
                  prayers={prayers}
                  onPressPrayerFunc={(uid) => {
                    navigation.navigate(RootRoutes.More, {
                      screen: MoreRoutes.PrayerEdit,
                      params: {
                        prayerId: uid,
                      },
                    });
                  }}
                />
              )}
            </View>
          </ScrollView>
        </View>
        {tabView === "PrayerList" && (
          <TouchableOpacity
            style={styles.floatingContent2}
            onPress={() => {
              navigation?.navigate(MoreRoutes.AddPrayer);
              //   navigation.navigate(RootRoutes.Notes, {
              //     screen: NotesRoutes.NotesCreate,
              //     params: undefined,
              //   });
            }}
          >
            <Text style={styles.fc2t}>
              <AntDesign
                name="plus"
                size={50}
                color={COLORS.Light.background}
              />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Prayer;

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
    paddingBottom: 10,
    paddingHorizontal: "8%",
    backgroundColor: COLORS.Light.background,
    height: "15%",
    // shadowColor: COLORS.Light.deeperGreyColor,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
    // elevation: 4,
    // zIndex: 10,
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
    // marginRight: "1%",
  },
  headerRC2: {
    // width: "95%",
    // paddingHorizontal: 5,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "space-around",
    // justifyContent: "center",
    // borderRadius: 40,
    backgroundColor: "transparent",
    alignItems: "center",
    // borderWidth: 1,
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
    // color: COLORS.Light.greyText,
    // fontSize: SIZES.sizeEight,
    // fontWeight: "300",
    width: "100%",
    backgroundColor: "transparent",
    // borderWidth: 1,
    height: "250%",
    alignItems: "center",
  },
  headerRC2t2Title: {
    // color: COLORS.Light.greyText,
    // fontSize: SIZES.sizeEight,
    // fontWeight: "300",
    width: "100%",
    backgroundColor: "transparent",
    // borderWidth: 1,
    // height: "250%",
    alignItems: "center",
    // marginVertical: "4%",
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
    marginVertical: 25,
    fontSize: SIZES.sizeSixC,
  },
  inputContentTitle: {
    fontSize: SIZES.sizeSevenB,
    fontWeight: "600",
    marginVertical: "4%",
    color: COLORS.Light.colorFour,
    width: "100%",
    backgroundColor: "transparent",
    // fontSize: SIZES.sizeEight,
    // fontWeight: "400",
    // borderWidth: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // marginVertical: 25,
    // fontSize: SIZES.sizeSixC,
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
  r1: {
    flexDirection: "row",
    // justifyContent: "center",
    width: "100%",
    alignItems: "center",
    marginBottom: "4%",
    backgroundColor: "transparent",
  },
  r1t2: {
    marginLeft: "8%",
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightB,
    fontWeight: "600",
    textAlign: "center",
  },
  v1rbt1: { marginHorizontal: 10 },
  v1rbt2: {},
  v1rb: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    // width: "20%",
    alignItems: "center",
    backgroundColor: "transparent",
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
    padding: 20,
    backgroundColor: COLORS.Light.hashBackGroundL2,
    width: "100%",
    borderRadius: 15,
  },
  title: {
    // color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSevenB,
    fontWeight: "600",
    marginVertical: "4%",
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
  v2: {
    backgroundColor: "transparent",
    marginVertical: 10,
    // paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 70,
    // marginRight: 10,
    width: "100%",
    // borderWidth: 1,
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
    fontWeight: "600",
    fontSize: SIZES.sizeEight,
  },

  floatingContent2: {
    height: 70,
    width: 70,
    position: "absolute",
    top: "85%",
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
    zIndex: 10,
    // borderWidth: 1,
  },
  fc2t: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // marginLeft: "8%",
  },
});
