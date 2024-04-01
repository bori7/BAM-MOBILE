import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export enum AuthRoutes {
  ConfirmEmail = "ConfirmEmail",
  DaDB = "DaDB",
  DaSB = "DaSB",
  ForgotPassword = "ForgotPassword",
  GFA = "GFA",
  NewPassword = "NewPassword",
  SignIn = "SignIn",
  SignUp = "SignUp",
  DaDBSwiper = "DaDBSwiper",
}

export type AuthParamList = {
  [AuthRoutes.ConfirmEmail]: undefined;
  [AuthRoutes.DaDB]: undefined;
  [AuthRoutes.DaSB]: undefined;
  [AuthRoutes.ForgotPassword]: undefined;
  [AuthRoutes.GFA]: undefined;
  [AuthRoutes.NewPassword]: undefined;
  [AuthRoutes.SignIn]: undefined;
  [AuthRoutes.SignUp]: undefined;
  [AuthRoutes.DaDBSwiper]: undefined;
};

export type AuthProps<RouteName extends AuthRoutes> = StackScreenProps<
  AuthParamList,
  RouteName
>;

export type AuthNavigationProps = StackNavigationProp<AuthParamList>;
