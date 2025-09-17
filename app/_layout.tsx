import { Stack } from "expo-router";
import RouteGuard from "./RouteGuard";
import {Provider as ReduxProvider} from 'react-redux'
import { store } from "./store";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <RouteGuard>
        <Stack screenOptions={{contentStyle: {marginHorizontal: 8}}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </ReduxProvider>
  )
}
