import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { RootStackParamList } from "../types"; 

export default function RootLayout() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'OneSignal' in window) {
      // @ts-ignore
      window.OneSignal = window.OneSignal || [];
      // @ts-ignore
      OneSignal.push(function () {
        OneSignal.init({
          appId: "TON_APP_ID_ICI", // <- remplace par ton vrai App ID
          notifyButton: {
            enable: true,
          },
        });
      });
    }
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />    </Stack>
  );
}
