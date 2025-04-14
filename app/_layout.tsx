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
          appId: "645d940c-7705-4509-b175-49bff85c8c34", // <- remplace par ton vrai App ID
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
