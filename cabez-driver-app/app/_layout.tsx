import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloclient";
import PorterSans from "@/assets/fonts/porter-sans-inline-block.ttf";
import NewPorterSans from "@/assets/fonts/porter-sans-inline-block.otf";
import PoppinsBold from "@/assets/fonts/Poppins-Bold.otf";
import PoppinsSemiBold from "@/assets/fonts/Poppins-SemiBold.otf";
import PoppinsMedium from "@/assets/fonts/Poppins-Medium.otf";
import { useColorScheme } from "@/components/useColorScheme";
import { Provider } from "react-redux";
import store from "@/store/store";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PorterSans: PorterSans,
    newPorterSans: NewPorterSans,
    PoppinsBold: PoppinsBold,
    PoppinsSemiBold: PoppinsSemiBold,
    PoppinsMedium: PoppinsMedium,
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <StatusBar hidden={false} barStyle="dark-content" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});