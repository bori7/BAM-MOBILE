import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export enum SearchRoutes {
  SearchMain = "SearchMain",
}

export type SearchParamList = {
  [SearchRoutes.SearchMain]: undefined;
};

export type SearchProps<RouteName extends SearchRoutes> = StackScreenProps<
  SearchParamList,
  RouteName
>;

export type SearchNavigationProps = StackNavigationProp<SearchParamList>;
