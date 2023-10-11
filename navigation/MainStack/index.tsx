import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomBar from "../BottomBar";
import {
  Success,
  EditImage,
  SelectImage,
  VerseOfTheDay,
  Home,
} from "../../pages/Main";
import { MainParamList, MainRoutes } from "../../shared/const/routerMain";

const Main = createStackNavigator<MainParamList>();

const MainStack = (): React.ReactElement => {
  return (
    <Main.Navigator
      initialRouteName={MainRoutes.Home}
      screenOptions={{ headerShown: false }}
    >
      <Main.Screen component={BottomBar} name={MainRoutes.Home} />
      <Main.Screen component={Success} name={MainRoutes.Success} />
      <Main.Screen component={EditImage} name={MainRoutes.EditImage} />
      <Main.Screen component={SelectImage} name={MainRoutes.SelectImage} />
      <Main.Screen component={VerseOfTheDay} name={MainRoutes.VerseOfTheDay} />
      <Main.Screen component={Home} name={MainRoutes.Home} />
    </Main.Navigator>
  );
};

export default MainStack;
