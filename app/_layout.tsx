import { Stack } from 'expo-router';
import { RootStackParamList } from "../types"; 

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />    </Stack>
  );
}
