import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/Colors";
import Home from "../../pages/Main/Home";
import { TabOptions } from "../../shared/const/routerBottomBar";
import { View, Text } from "../../components/Themed";

import { Octicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TAB_OPTIONS: TabOptions = {
  Home: {
    label: "Home",

    icon: ({ color }: { color: string }) => {
      return <></>;
    },
    component: Home as React.FC,
  },
  Bible: {
    label: "Bible",

    icon: ({ color }: { color: string }) => {
      return <></>;
    },
    component: Home as React.FC,
  },
  Devotioanl: {
    label: "Devotioanl",

    icon: ({ color }: { color: string }) => {
      return <></>;
    },
    component: Home as React.FC,
  },
  Search: {
    label: "Search",

    icon: ({ color }: { color: string }) => {
      return <></>;
    },
    component: Home as React.FC,
  },
  More: {
    label: "More",
    icon: ({ color }: { color: string }) => {
      return <></>;
    },
    component: Home as React.FC,
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
              color={focused ? COLORS.Light.colorOne : COLORS.Light.colorSix}
            />
          </View>

          <Text
            style={{
              color: focused ? COLORS.Light.colorOne : COLORS.Light.colorFour,
              fontSize: SIZES.sizeSix,
              fontWeight: "200",
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
    marginBottom: Platform.OS === "android" ? 10 : 15,
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
