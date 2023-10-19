import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { MoreParamList, MoreRoutes } from "../../shared/const/routerMore";

import {
  AboutGive,
  AddPrayer,
  Bookmarks,
  ChangePassword,
  DarkMode,
  EditProfile,
  EmailNotifications,
  GiftSummary,
  Give,
  GivingHistory,
  Highlights,
  ImageDesigns,
  MoreMain,
  Notifications,
  Prayer,
  Profile,
  PushNotifications,
  SettingsMore,
  SubscriptionMain,
  SubscriptionSummary,
  Support,
} from "../../pages/More";

const More = createStackNavigator<MoreParamList>();

const MainStack = (): React.ReactElement => {
  return (
    <More.Navigator
      initialRouteName={MoreRoutes.MoreMain}
      screenOptions={{ headerShown: false }}
    >
      <More.Screen
        component={AboutGive}
        name={MoreRoutes.AboutGive}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={AddPrayer}
        name={MoreRoutes.AddPrayer}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={Bookmarks}
        name={MoreRoutes.Bookmarks}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={ChangePassword}
        name={MoreRoutes.ChangePassword}
        options={{ headerShown: false }}
      />

      <More.Screen
        component={DarkMode}
        name={MoreRoutes.DarkMode}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={EditProfile}
        name={MoreRoutes.EditProfile}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={EmailNotifications}
        name={MoreRoutes.EmailNotifications}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={GiftSummary}
        name={MoreRoutes.GiftSummary}
        options={{ headerShown: false }}
      />

      <More.Screen
        component={Give}
        name={MoreRoutes.Give}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={GivingHistory}
        name={MoreRoutes.GivingHistory}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={Highlights}
        name={MoreRoutes.Highlights}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={ImageDesigns}
        name={MoreRoutes.ImageDesigns}
        options={{ headerShown: false }}
      />

      <More.Screen
        component={MoreMain}
        name={MoreRoutes.MoreMain}
        options={{ headerShown: false }}
      />

      <More.Screen
        component={Notifications}
        name={MoreRoutes.Notifications}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={Prayer}
        name={MoreRoutes.Prayer}
        options={{ headerShown: false }}
      />

      <More.Screen
        component={Profile}
        name={MoreRoutes.Profile}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={PushNotifications}
        name={MoreRoutes.PushNotifications}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={SettingsMore}
        name={MoreRoutes.Settings}
        options={{ headerShown: false }}
      />
      <More.Screen
        component={SubscriptionMain}
        name={MoreRoutes.SubscriptionMain}
        options={{ headerShown: false }}
      />

      <More.Screen
        component={SubscriptionSummary}
        name={MoreRoutes.SubscriptionSummary}
        options={{ headerShown: false }}
      />

      <More.Screen
        component={Support}
        name={MoreRoutes.Support}
        options={{ headerShown: false }}
      />
    </More.Navigator>
  );
};

export default MainStack;
