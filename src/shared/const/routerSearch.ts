import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export enum SearchRoutes {
  SearchMain = "SearchMain",
  SearchResults = "SearchResults",
}

export type SearchParamList = {
  [SearchRoutes.SearchMain]: undefined;
  [SearchRoutes.SearchResults]: undefined;
};

export type SearchProps<RouteName extends SearchRoutes> = StackScreenProps<
  SearchParamList,
  RouteName
>;

export type SearchNavigationProps = StackNavigationProp<SearchParamList>;
