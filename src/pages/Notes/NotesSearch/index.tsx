import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/Colors";
import { Entypo, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { NotesProps, NotesRoutes } from "../../../shared/const/routerNotes";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "../../../shared/const/routerRoot";
import { TextInput } from "react-native-paper";
import { NoteProps } from "../../../shared/types/slices";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

// type NavigationProps = NotesProps<NotesRoutes.NotesSearch>;

type NavigationProps = CompositeScreenProps<
  NotesProps<NotesRoutes.NotesSearch>,
  RootScreenProps<RootRoutes.Notes>
>;

const NotesSearch: React.FC<NavigationProps> = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [hideStatusBar, setHideStatusBar] = useState<boolean>(false);
  const [filteredNotes, setFilteredNotes] = useState<NoteProps[]>([]);

  const notesState = useSelector((state: RootState) => state.notes);
  const { notesData } = notesState;

  const filterNotes = (): NoteProps[] => {
    return (
      notesData?.notesList.filter((note, idx) => {
        const searchTermLower = searchText.toLowerCase();
        if (!searchTermLower) {
          return false;
        }
        const titleLower = note.title.toLowerCase();
        const textLower = note.text.toLowerCase();
        return (
          titleLower.includes(searchTermLower) ||
          textLower.includes(searchTermLower)
        );
      }) || []
    );
  };

  useEffect(() => {
    setFilteredNotes(filterNotes());
  }, [searchText, notesData]);

  return (
    <View style={[styles.main]}>
      <StatusBar barStyle="dark-content" hidden={hideStatusBar} />
      <View style={styles.container}>
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
                size={32}
                color={COLORS.Light.colorFour}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerRC2}>
              <View style={styles.headerRC2c1}>
                <TouchableOpacity style={styles.headerRC2t1}>
                  <Feather
                    name="search"
                    size={25}
                    color={COLORS.Light.colorFour}
                  />
                </TouchableOpacity>
                <View style={styles.headerRC2t2}>
                  <TextInput
                    mode="outlined"
                    placeholder={"Search"}
                    placeholderTextColor={COLORS.Light.colorFour}
                    textContentType="none"
                    style={{ ...styles.inputContent }}
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    selectionColor={COLORS.Light.colorOne}
                    outlineColor={"transparent"}
                    activeOutlineColor={"transparent"}
                    value={searchText}
                    onChangeText={(val) => {
                      setSearchText(val);
                    }}
                    onFocus={() => {
                      setHideStatusBar(true);
                    }}
                    onBlur={() => {
                      setHideStatusBar(false);
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.headerRC2t3}
                onPress={() => {
                  setSearchText("");
                  Keyboard.dismiss();
                }}
              >
                <Feather name="x" size={25} color={COLORS.Light.colorFour} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            {filteredNotes?.map((note, idx) => (
              <TouchableOpacity
                style={styles.r3}
                key={idx}
                onPress={() => {
                  // navigation?.navigate(NotesRoutes.NotesEdit);
                  navigation.navigate(RootRoutes.Notes, {
                    screen: NotesRoutes.NotesEdit,
                    params: {
                      noteId: note.uid,
                    },
                  });
                }}
              >
                <Text style={styles.r3t1}>{note?.title}</Text>
                <Text style={styles.r3t2}>{note?.text}</Text>
                {/* <Text style={styles.r3t3}>{note?.datetime}</Text> */}
                <Text style={styles.r3t3}>
                  {note?.time} {note?.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default NotesSearch;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.Light.background,
  },
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
    width: "95%",
    paddingHorizontal: 15,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "space-around",
    // justifyContent: "center",
    borderRadius: 40,
    backgroundColor: COLORS.Light.hashHomeBackGroundL2,
    alignItems: "center",
  },
  headerRC2c1: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    // justifyContent: "center",
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
    width: "85%",
    backgroundColor: "transparent",
    // borderWidth: 1,
    height: 40,
    alignItems: "center",
  },
  inputContent: {
    color: COLORS.Light.colorFour,
    width: "100%",
    backgroundColor: "transparent",
    fontSize: SIZES.sizeEight,
    fontWeight: "400",
    // borderWidth: 1,
    // alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  headerRC2t3: {
    // marginRight: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  r1: {
    flexDirection: "row",
    // justifyContent: "center",
    width: "100%",
    alignItems: "center",
    // marginBottom: "4%",
    backgroundColor: "transparent",

    // justifyContent:"flex-end"
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
  r2: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 40,
    backgroundColor: COLORS.Light.hashHomeBackGroundL2,
    alignItems: "center",
  },
  r2t1: {
    marginRight: "5%",
  },
  r2t2: {
    color: COLORS.Light.greyText,
    fontSize: SIZES.sizeSevenB,
    fontWeight: "400",
  },
  r3: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: COLORS.Light.hashBackGroundL2,
    marginBottom: 30,
  },
  r3t1: {
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEight,
    fontWeight: "500",
    marginVertical: 10,
  },
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
});
