import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  DevotionalParamList,
  DevotionalRoutes,
} from "../../shared/const/routerDevotional";
import {
  AboutDevotional,
  CalendarDevotional,
  SettingsDevotional,
  ContentDevotional,
  NotesDevotional,
  SubscriptionDevotional,
  FilterDevotional,
} from "../../pages/Devotional";

const Devotional = createStackNavigator<DevotionalParamList>();

const DevotionalStack = (): React.ReactElement => {
  return (
    <Devotional.Navigator
      initialRouteName={DevotionalRoutes.ContentDevotional}
      screenOptions={{ headerShown: false }}
    >
      <Devotional.Screen
        component={AboutDevotional}
        name={DevotionalRoutes.AboutDevotional}
        options={{ headerShown: false }}
      />
      <Devotional.Screen
        component={CalendarDevotional}
        name={DevotionalRoutes.CalendarDevotional}
        options={{ headerShown: false }}
      />
      <Devotional.Screen
        component={SettingsDevotional}
        name={DevotionalRoutes.SettingsDevotional}
        options={{ headerShown: false }}
      />
      <Devotional.Screen
        component={ContentDevotional}
        name={DevotionalRoutes.ContentDevotional}
        options={{ headerShown: false }}
      />
      <Devotional.Screen
        component={NotesDevotional}
        name={DevotionalRoutes.NotesDevotional}
        options={{ headerShown: false }}
      />
      <Devotional.Screen
        component={SubscriptionDevotional}
        name={DevotionalRoutes.SubscriptionDevotional}
        options={{ headerShown: false }}
      />
      <Devotional.Screen
        component={FilterDevotional}
        name={DevotionalRoutes.FilterDevotional}
        options={{ headerShown: false }}
      />
    </Devotional.Navigator>
  );
};

export default DevotionalStack;
