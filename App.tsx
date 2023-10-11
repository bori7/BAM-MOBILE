import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { store } from "./store";
import { ToastProvider } from "react-native-toast-notifications";
import React, { useEffect } from "react";
import CustomToast from "./shared/components/CustomToast";
import InactivityWrapper from "./shared/components/InactivityWrapper";
import Wrapper from "./shared/components/Wrapper";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();

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
