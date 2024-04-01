import "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import {store} from "./src/store";
import {ToastProvider} from "react-native-toast-notifications";
import React, {useEffect} from "react";
import CustomToast from "@shared/components/CustomToast";
import InactivityWrapper from "@shared/components/InactivityWrapper";
import Wrapper from "@shared/components/Wrapper";
import {Provider as PaperProvider} from "react-native-paper";
import {QueryClient, QueryClientProvider} from "react-query";
import {useFonts} from "expo-font";
import {newConsole} from "@shared/lib/debug";

// import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();


export default function App() {
    // const colorScheme = useColorScheme();
    const colorScheme = "light";


    const [areFontsLoaded] = useFonts({
        Bitter: require("@shared/assets/fonts/Bitter-Regular.ttf"),
        Roboto: require("@shared/assets/fonts/Roboto-Regular.ttf"),
    });

    if (!areFontsLoaded) {
        // Fonts are still loading, you can return a loading indicator if needed
        return null;
    }

    debug = newConsole();



  return (
    <ToastProvider
      offsetTop={10}
      swipeEnabled
      renderToast={(toast) => <CustomToast toast={toast} />}
    >
      <InactivityWrapper>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <PaperProvider>
                {/* <GestureHandlerRootView> */}
                <Wrapper child={<Navigation colorScheme={colorScheme} />} />
                {/* </GestureHandlerRootView> */}
                <StatusBar />
              </PaperProvider>
            </Provider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </InactivityWrapper>
    </ToastProvider>
  );
}
// }
