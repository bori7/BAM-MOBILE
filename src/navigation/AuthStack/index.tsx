import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthParamList, AuthRoutes } from "../../shared/const/routerAuth";
import {
  DaDB,
  DaSB,
  GFA,
  SignIn,
  SignUp,
  ForgotPassword,
  ConfirmEmail,
  NewPassword,
  DaDBSwiper,
} from "../../pages/Auth";

const Auth = createStackNavigator<AuthParamList>();

const AuthStack = (): React.ReactElement => {
  return (
    <Auth.Navigator
      screenOptions={
        {
          // headerMode: "float",
          //@ts-ignore
          // header: (props) => <HeaderAuthForNavigate {...props} />,
        }
      }
    >
      <Auth.Screen
        component={DaDBSwiper}
        name={AuthRoutes.DaDBSwiper}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        component={DaDB}
        name={AuthRoutes.DaDB}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        component={DaSB}
        name={AuthRoutes.DaSB}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        component={GFA}
        name={AuthRoutes.GFA}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        component={SignIn}
        name={AuthRoutes.SignIn}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        component={SignUp}
        name={AuthRoutes.SignUp}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        component={ForgotPassword}
        name={AuthRoutes.ForgotPassword}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        component={ConfirmEmail}
        name={AuthRoutes.ConfirmEmail}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        component={NewPassword}
        name={AuthRoutes.NewPassword}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

export default AuthStack;
