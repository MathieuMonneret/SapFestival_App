import { Stack } from 'expo-router';
import { useEffect } from 'react';
import Head from 'expo-router/head';

// Déclaration globale pour que TypeScript reconnaisse OneSignal
declare global {
  interface Window {
    OneSignal: any;
  }
}

export default function RootLayout() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialiser OneSignal
      window.OneSignal = window.OneSignal || [];
      window.OneSignal.push(function () {
        window.OneSignal.init({
          appId: "645d940c-7705-4509-b175-49bff85c8c34", // Ton vrai App ID
          notifyButton: {
            enable: true, // Affiche le bouton flottant d'abonnement
          },
          allowLocalhostAsSecureOrigin: true, // Pour les tests en local
        });
      });
    }
  }, []);

  return (
    <>
      {/* Injection du script OneSignal */}
      <Head>
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
      </Head>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}