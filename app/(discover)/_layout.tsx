import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: 'index',
};

export { ErrorBoundary } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Découvrir', headerShown: false }} />
      <Stack.Screen name="maps" options={{ title: '', headerTransparent: true }} />

      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
