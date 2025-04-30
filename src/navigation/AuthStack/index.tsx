import React, {useEffect, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {AuthParamList, AuthRoutes} from "@shared/const/routerAuth";
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
import {EncStorage} from "@shared/lib/encStorage";

const Auth = createStackNavigator<AuthParamList>();

const AuthStack = (): React.ReactElement => {
    const [initialRoute, setInitialRoute] = useState<keyof AuthParamList | null>(null);

    const alreadyUser = async () => {
        const existingUser = await EncStorage.getItem("alreadyUser");
        debug.log("existingUser", existingUser);
        setInitialRoute(existingUser ? AuthRoutes.SignIn : AuthRoutes.DaDBSwiper);

    }
    useEffect(() => {
        alreadyUser()
    }, [initialRoute]);

    if (!initialRoute) return <></>;

    return (
        <Auth.Navigator
            initialRouteName={initialRoute}
            screenOptions={
                {
                    // headerMode: "float",
                    //@ts-ignore
                    // header: (props) => <HeaderAuthForNavigate {...props} />,
                }
            }
        >
            {/*{!exists ?*/}
            {/*    <>*/}
            <Auth.Screen
                component={DaDBSwiper}
                name={AuthRoutes.DaDBSwiper}
                options={{headerShown: false}}
            />
            {/*        <Auth.Screen*/}
            {/*            component={SignIn}*/}
            {/*            name={AuthRoutes.SignIn}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}
            {/*    </> :*/}
            {/*    <>*/}
            {/*        <Auth.Screen*/}
            {/*            component={SignIn}*/}
            {/*            name={AuthRoutes.SignIn}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}
            {/*        <Auth.Screen*/}
            {/*            component={DaDBSwiper}*/}
            {/*            name={AuthRoutes.DaDBSwiper}*/}
            {/*            options={{headerShown: false}}*/}
            {/*        />*/}
            {/*    </>*/}
            {/*}*/}
            <Auth.Screen
                component={DaDB}
                name={AuthRoutes.DaDB}
                options={{headerShown: false}}
            />
            <Auth.Screen
                component={DaSB}
                name={AuthRoutes.DaSB}
                options={{headerShown: false}}
            />
            <Auth.Screen
                component={GFA}
                name={AuthRoutes.GFA}
                options={{headerShown: false}}
            />
            <Auth.Screen
                component={SignIn}
                name={AuthRoutes.SignIn}
                options={{headerShown: false}}
            />
            <Auth.Screen
                component={SignUp}
                name={AuthRoutes.SignUp}
                options={{headerShown: false}}
            />
            <Auth.Screen
                component={ForgotPassword}
                name={AuthRoutes.ForgotPassword}
                options={{headerShown: false}}
            />
            <Auth.Screen
                component={ConfirmEmail}
                name={AuthRoutes.ConfirmEmail}
                options={{headerShown: false}}
            />
            <Auth.Screen
                component={NewPassword}
                name={AuthRoutes.NewPassword}
                options={{headerShown: false}}
            />
        </Auth.Navigator>
    );
};

export default AuthStack;
