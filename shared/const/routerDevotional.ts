import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export enum DevotionalRoutes {
  AboutDevotional = "AboutDevotional",
  CalendarDevotional = "CalendarDevotional",
  ContentDevotional = "ContentDevotional",
  FilterDevotional = "FilterDevotional",
  NotesDevotional = "NotesDevotional",
  SettingsDevotional = "SettingsDevotional",
  SubscriptionDevotional = "SubscriptionDevotional",
}

export type DevotionalParamList = {
  [DevotionalRoutes.AboutDevotional]: undefined;
  [DevotionalRoutes.CalendarDevotional]: undefined;
  [DevotionalRoutes.ContentDevotional]: undefined;
  [DevotionalRoutes.FilterDevotional]: undefined;
  [DevotionalRoutes.NotesDevotional]: undefined;
  [DevotionalRoutes.SettingsDevotional]: undefined;
  [DevotionalRoutes.SubscriptionDevotional]: undefined;
};

export type DevotionalProps<RouteName extends DevotionalRoutes> =
  StackScreenProps<DevotionalParamList, RouteName>;

export type DevotionalNavigationProps =
  StackNavigationProp<DevotionalParamList>;
