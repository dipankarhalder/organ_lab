import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { View, Text } from "react-native";
import { useAuthStore } from "../store/auth";

import "./global.css";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "NunitoSans-Regular": require("../assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSans-Medium": require("../assets/fonts/NunitoSans-Medium.ttf"),
    "NunitoSans-SemiBold": require("../assets/fonts/NunitoSans-SemiBold.ttf"),
    "NunitoSans-Bold": require("../assets/fonts/NunitoSans-Bold.ttf"),
    "NunitoSans-ExtraBold": require("../assets/fonts/NunitoSans-ExtraBold.ttf"),
  });

  const hydrate = useAuthStore((state) => state.hydrate);
  const [authHydrated, setAuthHydrated] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await hydrate();
      setAuthHydrated(true);
    };

    prepare();
  }, [hydrate]);

  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded && authHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, authHydrated]);

  if (!fontsLoaded || !authHydrated) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Please wait, loading...</Text>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
