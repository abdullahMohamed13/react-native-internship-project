import { Stack } from "expo-router";
import RouteGuard from "./RouteGuard";

export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack screenOptions={{contentStyle: {marginHorizontal: 8}}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RouteGuard>
  )
}
