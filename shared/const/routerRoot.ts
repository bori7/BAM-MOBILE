import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

import { DevotionalParamList, DevotionalRoutes } from "./routerDevotional";
import { AuthRoutes, AuthParamList } from "./routerAuth";
import { SearchRoutes, SearchParamList } from "./routerSearch";
import { MainParamList, MainRoutes } from "./routerMain";
import { MoreRoutes, MoreParamList } from "./routerMore";

export enum RootRoutes {
  Auth = "AuthStack",
  Main = "MainStack",
  Devotional = "DevotionalStack",
  More = "MoreStack",
  Search = "SearchStack",
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
  };
  [RootRoutes.Search]?: {
    screen: SearchRoutes;
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
    MainParamList
>;

const screens = {
  ...AuthRoutes,
  ...DevotionalRoutes,
  ...MainRoutes,
  ...MoreRoutes,
  ...SearchRoutes,
};

export type ScreensType = typeof screens;
