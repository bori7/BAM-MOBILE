import React, { useEffect, useState } from "react";
import { Text, View } from "@components/Themed";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "@constants/Colors";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { RootRoutes, RootScreenProps } from "@shared/const/routerRoot";
import { TextInput } from "react-native-paper";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { SearchProps, SearchRoutes } from "@shared/const/routerSearch";
import SearchSuggestion from "./SearchSuggestion";
import SearchDevotional from "./SearchDevotional";

// type NavigationProps = NotesProps<NotesRoutes.NotesSearch>;

type NavigationProps = CompositeScreenProps<
  SearchProps<SearchRoutes.SearchResults>,
  RootScreenProps<RootRoutes.Search>
>;

const SearchResults: React.FC<NavigationProps> = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [hideStatusBar, setHideStatusBar] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const suggestionList = [
    "Jonah",
    "Book of Jonah",
    "Jonah 1",
    "Jonah 3",
    "Jonah 4",
    "Jonah 2:18",
  ];

  const searchDevotionalList = [
    {
      text: "Lorem ipsum dolor sit amet consectetur. Dolor placerat mattis facilisi viverra ut feugiat ultricies lectus Viverra. viverra ut feugiat ultricies lectus. Viverra.viverra ut feu",
      title: "ra ut feugiat ultricies lectus. Viverra.",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Dolor placerat mattis facilisi viverra ut feugiat ultricies lectus Viverra. viverra ut feugiat ultricies lectus. Viverra.viverra ut feu",
      title: "ra ut feugiat ultricies lectus. Viverra.",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Dolor placerat mattis facilisi viverra ut feugiat ultricies lectus Viverra. viverra ut feugiat ultricies lectus. Viverra.viverra ut feu",
      title: "ra ut feugiat ultricies lectus. Viverra.",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Dolor placerat mattis facilisi viverra ut feugiat ultricies lectus Viverra. viverra ut feugiat ultricies lectus. Viverra.viverra ut feu",
      title: "ra ut feugiat ultricies lectus. Viverra.",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Dolor placerat mattis facilisi viverra ut feugiat ultricies lectus Viverra. viverra ut feugiat ultricies lectus. Viverra.viverra ut feu",
      title: "ra ut feugiat ultricies lectus. Viverra.",
    },
  ];
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
                    textColor={COLORS.Light.colorFour}
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
                      setShowSuggestions(true);
                    }}
                    onBlur={() => {
                      setHideStatusBar(false);
                      setShowSuggestions(false);
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
          {searchText && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              style={styles.scroll}
            >
              <View style={styles.r1}>
                <TouchableOpacity
                  style={[
                    styles.v3c,
                    { backgroundColor: COLORS.Light.colorOne },
                  ]}
                  onPress={() => {}}
                >
                  <Text
                    style={[styles.v3ct, { color: COLORS.Light.background }]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.v3c]} onPress={() => {}}>
                  <Text style={styles.v3ct}>Devotional</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  {showSuggestions && (
                    <Text style={styles.contentHeaderText}>Trending</Text>
                  )}

                  {!showSuggestions && (
                    <>
                      <Text style={styles.contentHeaderText}>Devotional</Text>
                      <TouchableOpacity style={styles.contentHeaderC2}>
                        <Text style={styles.contentHeaderC2t1}>See all</Text>
                        <Text style={styles.contentHeaderC2t2}>
                          <AntDesign
                            name="right"
                            size={20}
                            color={COLORS.Light.gray}
                          />
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View style={styles.contentBody}>
                  {showSuggestions &&
                    suggestionList?.map((x, idx) => (
                      <TouchableOpacity
                        style={styles.contentBodyRow}
                        key={idx}
                        onPress={() => {
                          setShowSuggestions(false);
                          // setHideStatusBar(false);
                        }}
                      >
                        <SearchSuggestion text={x} />
                      </TouchableOpacity>
                    ))}
                  {!showSuggestions &&
                    searchDevotionalList?.map((x, idx) => (
                      <TouchableOpacity style={styles.contentB2} key={idx}>
                        <SearchDevotional text={x.text} title={x.title} />
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchResults;

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
    marginBottom: "4%",
    backgroundColor: "transparent",
  },
  v3c: {
    backgroundColor: COLORS.Light.colorOneLight,
    paddingVertical: 10,
    paddingHorizontal: 24,
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
  r1c1: {},
  r1c2: {},
  content: {
    width: "100%",
  },
  contentHeader: {
    marginVertical: "7%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentHeaderText: {
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightB,
    fontWeight: "600",
  },
  contentBody: {
    width: "100%",
    // borderWidth: 1,
  },
  contentBodyRow: {
    flexDirection: "row",
    width: "100%",
    // borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 5,
  },
  cBRC1: {
    flexDirection: "row",
    alignItems: "center",
  },
  cBRC1t1: {
    marginRight: "12%",
  },
  cBRC1t2: {
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEight,
    fontWeight: "400",
  },
  contentHeaderC2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentHeaderC2t1: {
    color: COLORS.Light.gray,
    fontSize: SIZES.sizeSeven,
    fontWeight: "500",
  },
  contentHeaderC2t2: {
    marginLeft: "1%",
  },
  contentB2: {
    width: "100%",
    // borderWidth: 1,
    marginBottom: "5%",
  },
  contentB2t1: {
    lineHeight: 24,
    marginVertical: "4%",
    color: COLORS.Light.gray,
    fontSize: SIZES.sizeSixB,
    fontWeight: "500",
  },
  contentB2t2: {
    fontSize: SIZES.sizeSeven,
    fontWeight: "600",
  },
  cBRC2: {},
  cBRC2t: {},
  r1t1: {},
  r1t2: {
    marginLeft: "8%",
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEight,
    fontWeight: "600",
    textAlign: "center",
  },
  bodyContainer: {
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
    paddingBottom: "25%",
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
