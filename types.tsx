/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "@shared/const/routerRoot";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { ReactNode } from "react";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}

export type CountryType = {
  countryName?: string;
  countryCode?: string;
  phoneCode?: string;
  locale?: string;
  countryFlag?: string;
  countryCcy?: string;
  currency?: string;
};

export type RootStackScreenProps<Screen extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootParamList>
  >;

export interface MainButtonContainer {
  title: string | ReactNode;
  disabled?: boolean;
  // whiteStyling?: boolean,
  btnStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPressFunction: () => void;
  err?: boolean;
  loading?: boolean;
}

export interface CountryPickerContainer {
  handleChosenCountry: any;
}
