import { StackScreenProps } from "@react-navigation/stack";

export enum Tabs {
  Home = "Home",
  Devotional = "Devotional",
  Search = "Search",
  More = "More",
  Bible = "Bible",
}

export type TabsNavigatorParamList = {
  [Tabs.Home]: undefined;
  [Tabs.Devotional]: undefined;
  [Tabs.Search]: undefined;
  [Tabs.More]: undefined;
  [Tabs.Bible]: undefined;
};

export type TabsScreenProps<RouteName extends Tabs> = StackScreenProps<
  TabsNavigatorParamList,
  RouteName
>;

export type TabOptions = {
  [key: string]: {
    label: string;
    icon: any;
    component: React.FC;
  };
};
