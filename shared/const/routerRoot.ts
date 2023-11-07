import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

import { DevotionalParamList, DevotionalRoutes } from "./routerDevotional";
import { AuthRoutes, AuthParamList } from "./routerAuth";
import { SearchRoutes, SearchParamList } from "./routerSearch";
import { MainParamList, MainRoutes } from "./routerMain";
import { MoreRoutes, MoreParamList } from "./routerMore";
import { NotesParamList, NotesRoutes } from "./routerNotes";
import { Tabs } from "./routerBottomBar";

export enum RootRoutes {
  Auth = "AuthStack",
  Main = "MainStack",
  Devotional = "DevotionalStack",
  More = "MoreStack",
  Search = "SearchStack",
  Notes = "NotesStack",
  Tabs = "BottomBar",
}

export type RootParamList = {
  [RootRoutes.Auth]?: {
    screen: AuthRoutes;
  };
  [RootRoutes.Main]?: {
    screen: MainRoutes;
    params: any;
  };
  [RootRoutes.Devotional]?: {
    screen: DevotionalRoutes;
  };
  [RootRoutes.More]?: {
    screen: MoreRoutes;
    params: any | undefined;
  };
  [RootRoutes.Search]?: {
    screen: SearchRoutes;
  };
  [RootRoutes.Notes]?: {
    screen: NotesRoutes;
    params: any | undefined;
  };
  [RootRoutes.Tabs]?: {
    screen: Tabs;
    params: any | undefined;
  };
};

export type RootScreenProps<RouteName extends RootRoutes> = StackScreenProps<
  RootParamList,
  RouteName
>;

export type RootNavigationProps = StackNavigationProp<
  RootParamList &
    AuthParamList &
    SearchParamList &
    DevotionalParamList &
    MoreParamList &
    NotesParamList &
    MainParamList
>;

const screens = {
  ...AuthRoutes,
  ...DevotionalRoutes,
  ...MainRoutes,
  ...MoreRoutes,
  ...SearchRoutes,
  ...NotesRoutes,
};

export type ScreensType = typeof screens;
