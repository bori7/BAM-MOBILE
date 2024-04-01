import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export enum MoreRoutes {
  AboutGive = "AboutGive",
  AddPrayer = "AddPrayer",
  Bookmarks = "Bookmarks",
  ChangePassword = "ChangePassword",
  DarkMode = "DarkMode",
  EditProfile = "EditProfile",
  EmailNotifications = "EmailNotifications",
  GiftSummary = "GiftSummary",
  Give = "Give",
  GivingHistory = "GivingHistory",
  Highlights = "Highlights",
  ImageDesigns = "ImageDesigns",
  MoreMain = "MoreMain",
  Notes = "Notes",
  Notifications = "Notifications",
  Prayer = "Prayer",
  Profile = "Profile",
  PushNotifications = "PushNotifications",
  Settings = "Settings",
  SubscriptionMain = "SubscriptionMain",
  SubscriptionSummary = "SubscriptionSummary",
  Support = "Support",
  PrayerEdit = "PrayerEdit",
  ImageCapture = "ImageCapture",
  VOD = "VOD",
}

export type MoreParamList = {
  [MoreRoutes.AboutGive]: undefined;
  [MoreRoutes.AddPrayer]: undefined;
  [MoreRoutes.Bookmarks]: undefined;
  [MoreRoutes.ChangePassword]: undefined;
  [MoreRoutes.DarkMode]: undefined;
  [MoreRoutes.EditProfile]: undefined;
  [MoreRoutes.EmailNotifications]: undefined;
  [MoreRoutes.GiftSummary]: undefined;
  [MoreRoutes.Give]: undefined;
  [MoreRoutes.GivingHistory]: undefined;
  [MoreRoutes.Highlights]: undefined;
  [MoreRoutes.ImageDesigns]: undefined;
  [MoreRoutes.MoreMain]: undefined;
  [MoreRoutes.Notes]: undefined;

  [MoreRoutes.Notifications]: undefined;
  [MoreRoutes.Prayer]: undefined;
  [MoreRoutes.Profile]: undefined;
  [MoreRoutes.PushNotifications]: undefined;
  [MoreRoutes.Settings]: undefined;
  [MoreRoutes.SubscriptionMain]: undefined;
  [MoreRoutes.SubscriptionSummary]: undefined;

  [MoreRoutes.VOD]: undefined;
  [MoreRoutes.Support]: undefined;
  [MoreRoutes.PrayerEdit]: {
    // params: {
    prayerId: string;
    // };
  };
  [MoreRoutes.ImageCapture]: undefined;
};

export type MoreProps<RouteName extends MoreRoutes> = StackScreenProps<
  MoreParamList,
  RouteName
>;

export type MoreNavigationProps = StackNavigationProp<MoreParamList>;
