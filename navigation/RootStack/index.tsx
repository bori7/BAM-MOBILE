import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RootParamList, RootRoutes } from "../../shared/const/routerRoot";
import AuthStack from "../AuthStack";
import MainStack from "../MainStack";
import DevotionalStack from "../DevotionalStack";
import SearchStack from "../SearchStack";
import NotesStack from "../NotesStack";
import MoreStack from "../MoreStack";
import BottomBar from "../BottomBar";

const RootStack = createStackNavigator<RootParamList>();

const RootStackApp = (): React.ReactElement => {
  return (
    <RootStack.Navigator
      initialRouteName={RootRoutes.Auth}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen component={AuthStack} name={RootRoutes.Auth} />
      <RootStack.Screen component={MainStack} name={RootRoutes.Main} />
      <RootStack.Screen component={BottomBar} name={RootRoutes.Tabs} />
      <RootStack.Screen
        component={DevotionalStack}
        name={RootRoutes.Devotional}
      />
      <RootStack.Screen component={SearchStack} name={RootRoutes.Search} />
      <RootStack.Screen component={NotesStack} name={RootRoutes.Notes} />
      <RootStack.Screen component={MoreStack} name={RootRoutes.More} />
    </RootStack.Navigator>
  );
};

export default RootStackApp;
