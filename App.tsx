import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { store } from "./store";
import { ToastProvider } from "react-native-toast-notifications";
import React from "react";
import CustomToast from "./shared/components/CustomToast";
import InactivityWrapper from "./shared/components/InactivityWrapper";
import Wrapper from "./shared/components/Wrapper";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { useFonts } from "expo-font";

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();

  const [areFontsLoaded] = useFonts({
    Roboto: require("./shared/assets/fonts/Roboto-Regular.ttf"),
    Bitter: require("./shared/assets/fonts/Bitter-Regular.ttf"),
  });

  if (!areFontsLoaded) {
    // Fonts are still loading, you can return a loading indicator if needed
    return null;
  }

  return (
    <ToastProvider
      offsetTop="6%"
      swipeEnabled
      renderToast={(toast) => <CustomToast toast={toast} />}
    >
      <InactivityWrapper>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <PaperProvider>
                <Wrapper child={<Navigation colorScheme={colorScheme} />} />
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
