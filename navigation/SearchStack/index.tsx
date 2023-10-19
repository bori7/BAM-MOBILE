import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchParamList, SearchRoutes } from "../../shared/const/routerSearch";
import { SearchMain } from "../../pages/Search";
import SearchResults from "../../pages/Search/SearchResults";

const Search = createStackNavigator<SearchParamList>();

const SearchStack = (): React.ReactElement => {
  return (
    <Search.Navigator
      initialRouteName={SearchRoutes.SearchMain}
      screenOptions={{ headerShown: false }}
    >
      <Search.Screen
        component={SearchMain}
        name={SearchRoutes.SearchMain}
        options={{ headerShown: false }}
      />
      <Search.Screen
        component={SearchResults}
        name={SearchRoutes.SearchResults}
        options={{ headerShown: false }}
      />
    </Search.Navigator>
  );
};

export default SearchStack;
