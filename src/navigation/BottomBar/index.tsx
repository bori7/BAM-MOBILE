import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@constants/Colors";
import { TabOptions } from "@shared/const/routerBottomBar";
import { View, Text } from "@components/Themed";
import { Octicons } from "@expo/vector-icons";
import HomeIcon from "../../shared/assets/images/svg/home_icon.svg";
import DevotionalIcon from "../../shared/assets/images/svg/devotional_icon.svg";
import NotesIcon from "../../shared/assets/images/svg/notes_icon.svg";
import SearchIcon from "../../shared/assets/images/svg/search_icon.svg";
import MoreIcon from "../../shared/assets/images/svg/more_icon.svg";
import { Home } from "../../pages/Main";
import { ContentDevotional, MainDevotional } from "../../pages/Devotional";
import { MoreMain } from "../../pages/More";
import { SearchMain } from "../../pages/Search";
import { NotesMain } from "../../pages/Notes";

const Tab = createBottomTabNavigator();

const TAB_OPTIONS: TabOptions = {
  Home: {
    label: "Home",
    icon: ({ color }: { color: string }) => {
      return (
        <>
          <HomeIcon fill={color} />
        </>
      );
    },
    component: Home as React.FC,
  },

  Devotional: {
    label: "Devotional",

    icon: ({ color }: { color: string }) => {
      return (
        <>
          <DevotionalIcon fill={color} />
        </>
      );
    },
    component: MainDevotional as React.FC,
  },
  // Bible: {
  //   label: "Bible",

  //   icon: ({ color }: { color: string }) => {
  //     return <>
  //     </>;
  //   },
  //   component: Home as React.FC,
  // },

  Notes: {
    label: "Notes",

    icon: ({ color }: { color: string }) => {
      return (
        <>
          <NotesIcon stroke={color} strokeWidth={2} fill={COLORS.Light.background} />
        </>
      );
    },
    component: NotesMain as React.FC,
  },

  // Search: {
  //   label: "Search",
  //
  //   icon: ({ color }: { color: string }) => {
  //     return (
  //       <>
  //         <SearchIcon stroke={color} />
  //       </>
  //     );
  //   },
  //   component: SearchMain as React.FC,
  // },
  More: {
    label: "More",
    icon: ({ color }: { color: string }) => {
      return (
        <>
          <MoreIcon fill={color} />
        </>
      );
    },
    component: MoreMain as React.FC,
  },
};

const BottomTabNavigator = (): React.ReactElement => {
  const getTabOptions = (name: keyof typeof TAB_OPTIONS) => ({
    tabBarIcon: ({ focused }: { focused: boolean }) => {
      const CompToRender = TAB_OPTIONS[name].icon;
      return (
        <View style={styles.containerItem}>
          <View
            style={[
              styles.containerIcon,
              // focused &&
              //   TAB_OPTIONS[name].label === "Account" &&
              //   styles.focusIcon,
            ]}
          >
            <CompToRender
              color={
                focused ? COLORS.Light.colorOne : COLORS.Light.deeperGreyColor
              }
            />
          </View>

          <Text
            style={{
              color: focused
                ? COLORS.Light.colorOne
                : COLORS.Light.deeperGreyColor,
              fontSize: SIZES.sizeFiveB,
              fontWeight: "400",
            }}
          >
            {focused ? (
              <Octicons
                name="dot-fill"
                size={20}
                color={COLORS.Light.colorOne}
              />
            ) : (
              TAB_OPTIONS[name].label
            )}
          </Text>
        </View>
      );
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      {Object.keys(TAB_OPTIONS).map((name) => (
        <Tab.Screen
          key={name}
          component={TAB_OPTIONS[name].component}
          name={name}
          options={getTabOptions(name)}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === "android" ? 70 : 100,
    backgroundColor: COLORS.Light.background,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  containerItem: {
    alignItems: "center",
    gap: 8,
    marginBottom: Platform.OS === "android" ? 20 : 25,
  },
  containerIcon: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  focusIcon: {
    backgroundColor: COLORS.Light.colorOne,
  },
});

export default BottomTabNavigator;
