/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootParamList } from "../shared/const/routerRoot";

const linking: LinkingOptions<RootParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {},
  },
};

export default linking;
