import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export enum MainRoutes {
  HomeScreen = "HomeScreen",
  EditImage = "EditImage",
  Success = "Success",
  SelectImage = "SelectImage",
  VerseOfTheDay = "VerseOfTheDay",
}

export type MainParamList = {
  [MainRoutes.HomeScreen]: undefined;
  [MainRoutes.EditImage]: undefined;
  [MainRoutes.SelectImage]: undefined;
  [MainRoutes.VerseOfTheDay]: undefined;
  [MainRoutes.Success]: {
    mainText: string;
    subText: string;
    btnText: string;
    toScreen: any;
    toSubScreen: any;
    toSubScreenParams: any;
  };
};

export type MainProps<RouteName extends MainRoutes> = StackScreenProps<
  MainParamList,
  RouteName
>;

export type MainNavigationProps = StackNavigationProp<MainParamList>;

//  [screen: keyof MainParamList] | [screen: keyof MainParamList, params: { mainText: string; subText: string; btnText: string; toScreen: CreatePlanRoutes | ... 4 more ... | Tabs; } | undefined]'
//  [screen: keyof MainParamList] | [screen: keyof MainParamList, params: { mainText: string; subText: string; btnText: string; toScreen: [screen: keyof MainParamList] | [screen: ...]; } | undefined]'.
