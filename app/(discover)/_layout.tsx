import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Discover', headerShown: false }} />
      <Stack.Screen name="maps" options={{ title: 'Maps', headerShown: false }} />

      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
